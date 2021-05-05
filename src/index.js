#!/usr/bin/node

const {WebServer, HttpError} = require("./webserver");
const {WebSocketServer} = require("./websocketserver");
const {Group, Student, Criteria, SubjectPreference, Subject, LearningStyles} = require("./group");
const {GroupFormation, WeightedCriteria} = require("./formation");
const fs = require("fs");
const typeassert = require("./typeassert");
const {balance} = require("./algorithms/0point");
const {maxDistance} = require("./algorithms/distance");
const {splitAvgMinDistance} = require("./algorithms/splitAvgMinDistance");
const {averageVectorMinDistance, averageVectorDistance} = require("./algorithms/vectorspace");
const weightFunctions = require("./algorithms/weightFunction");
const {mapRange} = require("./math");
const Cookies = require("cookies");
const { masterAlg } = require("./algorithms/masterAlgorithm");
const { averagePreferenceAlg } = require("./algorithms/averagePreferences");


// Read config file
fs.readFile("config.json", (configErr, configData) => {
    if (configErr) {
        console.error("Could not read config.json", configErr);
    }
    else {
        let config;
        try {
            config = JSON.parse(configData);
        }
        catch (e) {
            console.error("Could not parse config file", e);
            return;
        }


        // Read students
        fs.readFile(config.studentsFile, (studentsErr, studentsData) => {
            if (studentsErr) {
                console.error("Could not read " + config.studentsFile, studentsErr);
            }
            else {
                let students;
                try {
                    students = JSON.parse(studentsData);
                }
                catch (e) {
                    console.error("Could not parse students file", e);
                    return;
                }

                typeassert.assertArray(students);

                // Convert all student data to Student instances
                students = convertStudents(students);

                typeassert.assertArrayItemsInstanceOf(students, Student);


                const heterogenousAlgorithm = configToAlgorithmFunction(config);
                const customMasterAlg = (heterogenousCri, homogenousCri, subjects) =>
                    masterAlg(heterogenousAlgorithm, averagePreferenceAlg, averagePreferenceAlg, heterogenousCri, homogenousCri, subjects, config.algorithm.weights);
                const groupFormation = new GroupFormation(students, config.algorithm.maxGroupSize, customMasterAlg);


                const webServer = new WebServer(config.server.hostname, config.server.port, "src/www");
                const webSocketServer = new WebSocketServer(webServer);

                webServer.addPostHandler("/api/login", (data, cookies) => loginHandler(groupFormation, data, cookies));

                webServer.addGetHandler("/api/me", (_, cookies) => meHandler(groupFormation, cookies));
                webServer.addGetHandler("/api/mygroup", (_, cookies) => mygroupHandler(groupFormation, cookies));
                webServer.addGetHandler("/api/rankedgroups", (_, cookies) => rankedgroupsHandler(groupFormation, cookies));
                webServer.addGetHandler("/api/leavegroup", (_, cookies) => leavegroupHandler(webSocketServer, groupFormation, cookies));
                webServer.addPostHandler("/api/invitegroup", (data, cookies) => invitegroupHandler(webSocketServer, groupFormation, data, cookies));



                webServer.run()
                    .then(() => console.log(`Server running on ${config.server.hostname}:${config.server.port}`))
                    .catch((e) => console.error("Could not start server!", e));
            }
        });
    }
});


/**
 * @summary Handles the /api/login endpoint
 * @param {GroupFormation} groupFormation The object representing the group formation process
 * @param {object} data Post data
 * @param {Cookies} cookies A cookie object used to get and set cookies
 */
function loginHandler(groupFormation, data, cookies) {
    typeassert.assertInstanceOf(groupFormation, GroupFormation);
    typeassert.assertInstanceOf(cookies, Cookies);

    if (typeof data.username !== "string") {
        throw new HttpError(400, "Invalid username");
    }

    if (!groupFormation.students.some((s) => s.name === data.username)) {
        throw new HttpError(400, "This student does not exist");
    }

    cookies.set("session", data.username, {sameSite: true});
}

/**
 * @summary Handles the /api/me endpoint
 * @param {GroupFormation} groupFormation The object representing the group formation process
 * @param {Cookies} cookies A cookie object used to get and set cookies
 * @returns {Student} The session student
 */
function meHandler(groupFormation, cookies) {
    typeassert.assertInstanceOf(groupFormation, GroupFormation);
    typeassert.assertInstanceOf(cookies, Cookies);

    const session = validateSessionCookie(cookies);

    const student = getStudent(groupFormation, session);

    return student.toStudent();
}

/**
 * @summary Handles the /api/mygroup endpoint
 * @param {GroupFormation} groupFormation The object representing the group formation process
 * @param {Cookies} cookies A cookie object used to get and set cookies
 * @returns {Group} My group
 */
function mygroupHandler(groupFormation, cookies) {
    typeassert.assertInstanceOf(groupFormation, GroupFormation);
    typeassert.assertInstanceOf(cookies, Cookies);

    const session = validateSessionCookie(cookies);

    const student = getStudent(groupFormation, session);
    const group = student.group;

    const groupToSend = group.toGroup();
    groupToSend.invitations = group.invitations.map((g) => g.id);

    return groupToSend;
}

/**
 * @summary Handles the /api/rankedgroups endpoint
 * @param {GroupFormation} groupFormation The object representing the group formation process
 * @param {Cookies} cookies A cookie object used to get and set cookies
 * @returns {Array} An array of ranked groups by tuple {group, value}
 */
function rankedgroupsHandler(groupFormation, cookies) {
    typeassert.assertInstanceOf(groupFormation, GroupFormation);
    typeassert.assertInstanceOf(cookies, Cookies);

    const session = validateSessionCookie(cookies);

    const student = getStudent(groupFormation, session);
    const group = student.group;

    const candidates = group.candidates();
    const rankedGroups = group.valueGroups(candidates);

    const arr = [];

    for (let [rankedGroup, value] of rankedGroups.entries()) {
        const newGroup = rankedGroup.toGroup();
        newGroup.isInvited = rankedGroup.invitations.some((g) => g === group);
        arr.push({group: newGroup, value});
    }

    const values = arr.map((pair) => pair.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return arr.map((pair) => {
        pair.value = mapRange(pair.value, min, max, 0, 10);
        return pair;
    });
}

/**
 * @summary Handles the /api/leavegroup endpoint
 * @param {WebSocketServer} webSocketServer The websocket server
 * @param {GroupFormation} groupFormation The object representing the group formation process
 * @param {Cookies} cookies A cookie object used to get and set cookies
 */
function leavegroupHandler(webSocketServer, groupFormation, cookies) {
    typeassert.assertInstanceOf(webSocketServer, WebSocketServer);
    typeassert.assertInstanceOf(groupFormation, GroupFormation);
    typeassert.assertInstanceOf(cookies, Cookies);

    const session = validateSessionCookie(cookies);

    const student = getStudent(groupFormation, session);
    if (student.group.students.length === 1) {
        throw new HttpError(400, "Cannot leave 1 man group");
    }

    student.leave();

    webSocketServer.broadcastMessage("update");
}

/**
 * @summary Handles the /api/invitegroup endpoint
 * @param {WebSocketServer} webSocketServer The websocket server
 * @param {GroupFormation} groupFormation The object representing the group formation process
 * @param {object} data Post data
 * @param {Cookies} cookies A cookie object used to get and set cookies
 */
function invitegroupHandler(webSocketServer, groupFormation, data, cookies) {
    typeassert.assertInstanceOf(webSocketServer, WebSocketServer);
    typeassert.assertInstanceOf(groupFormation, GroupFormation);
    typeassert.assertInstanceOf(cookies, Cookies);

    const session = validateSessionCookie(cookies);

    if (typeof data.groupid === "undefined") {
        throw new HttpError(400, "Missing groupid");
    }

    const groupid = Number(data.groupid);


    const student = getStudent(groupFormation, session);

    const group = groupFormation.groups.find((g) => g.id === groupid);

    if (group === undefined) {
        throw new HttpError(500, "Group does not exist");
    }

    if (student.group.invitations.includes(group)) {
        groupFormation.mergeGroup(student.group, group);
    }
    else {
        if (group.invitations.includes(student.group)) {
            throw new HttpError(400, "Group already invited");
        }
        group.invitations.push(student.group);
    }

    webSocketServer.broadcastMessage("update");
}

/**
 * @summary Validates and returns the session cookie
 * @param {Cookies} cookies A cookie object used to get and set cookies
 * @returns {string} session Value of the session cookie
 * @throws {HttpError} session cookie is invalid
 */
function validateSessionCookie(cookies) {
    typeassert.assertInstanceOf(cookies, Cookies);

    const session = cookies.get("session");

    if (session === undefined) {
        throw new HttpError(403, "Invalid session cookie");
    }

    return session;
}

/**
 * @summary Gets a student by name
 * @param {GroupFormation} groupFormation The object representing the group formation process
 * @param {string} name The name of the student
 * @returns {Student} The student
 * @throws {HttpError} Student with name name does not exist
 */
function getStudent(groupFormation, name) {
    typeassert.assertInstanceOf(groupFormation, GroupFormation);
    typeassert.assertStringNotEmpty(name);

    const student = groupFormation.students.find((s) => s.name === name);
    if (student === undefined) {
        throw new HttpError(400, "student name is invalid");
    }
    else {
        return student;
    }
}

/**
 * @summary Convert student objects from json to student objects that is an instance of Student
 * @param {Student[]} students an array of students read in from json
 * @returns {Student[]} An array of students that is an instance of Student
 */
function convertStudents(students) {
    typeassert.assertArray(students);

    students.forEach((s) => {
        s.__proto__ = Student.prototype;
        s.criteria.__proto__ = Criteria.prototype;
        s.criteria.subjectPreference.__proto__ = SubjectPreference.prototype;
        s.criteria.subjectPreference.subjects.forEach((sub) =>
            sub.__proto__ = Subject.prototype
        );
        s.criteria.learningStyles.__proto__ = LearningStyles.prototype;
    });
    return students;
}

/**
 * @summary Takes config data and returns homogenus algorithm function
 * @param {object} config The config
 * @returns {Function} The algorithm
 * @throws {RangeError} Invalid algorithm
 */
function configToAlgorithmFunction(config) {
    typeassert.assertStringNotEmpty(config.algorithm.homoAlgo);

    switch (config.algorithm.homoAlgo) {
    case "random": return () => Math.random();
    case "0point": return balance;
    case "distance": return maxDistance;
    case "amalgemation": return (criteria) => 22 - maxDistance(criteria) + balance(criteria);
    case "splitAvgMinDistance": return splitAvgMinDistance;
    case "averageVectorMinDistance": return (criteria) => averageVectorMinDistance(criteria, config.algorithm.p, configToWeightFunction(config));
    case "averageVectorDistance": return (criteria) => averageVectorDistance(criteria, config.algorithm.p, configToWeightFunction(config));
    default: throw new RangeError("Invalid algorithm");
    }
}

/**
 * @summary Takes config data and returns a weigh function
 * @param {object} config The config
 * @returns {Function} The weigh function
 * @throws {RangeError} Invalid weigh function
 */
function configToWeightFunction(config) {
    typeassert.assertStringNotEmpty(config.algorithm.weighFunction);

    switch (config.algorithm.weighFunction) {
    case "constant": return weightFunctions.constant;
    case "sigmoid0to2": return weightFunctions.sigmoid0to2;
    default: throw new RangeError("Invalid weighfunction");
    }
}
