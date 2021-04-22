#!/usr/bin/node

const {WebServer, HttpError} = require("./webserver");
const {WebSocketServer} = require("./websocketserver");
const {Student, Criteria, LearningStyles, SubjectPreference, Subject} = require("./group");
const {GroupFormation, WeightedCriteria} = require("./formation");
const fs = require("fs");
const typeassert = require("./typeassert");
const {balance} = require("./algorithms/0point");
const {maxDistance} = require("./algorithms/distance");
const {splitAvgMinDistance} = require("./algorithms/splitAvgMinDistance");
const {averageVectorMinDistance, averageVectorDistance} = require("./algorithms/vectorspace");
const weightFunctions = require("./algorithms/weightFunction");
const {mapRange} = require("./math");

// Read config file
fs.readFile("config.json", (err, data) => {
    if (err) {
        console.error("Could not read config.json", err);
    }
    else {
        let config;
        try {
            config = JSON.parse(data);
        }
        catch (e) {
            console.error("Could not parse config file", e);
            return;
        }


        // Read students
        fs.readFile(config.studentsFile, (err, data) => {
            if (err) {
                console.error("Could not read " + config.studentsFile, err);
            }
            else {
                let students;
                try {
                    students = JSON.parse(data);
                }
                catch (e) {
                    console.error("Could not parse students file", e);
                    return;
                }

                typeassert.assertArray(students);

                // Convert students to Students
                students = convertStudents(students);

                typeassert.assertArrayItemsInstanceOf(students, Student);


                const algorithm = configToAlgorithmFunction(config);
                const weightedCriteria = new WeightedCriteria(null, algorithm);
                const groupFormation = new GroupFormation(students, config.maxGroupSize, weightedCriteria);


                const webServer = new WebServer(config.hostname, config.port, "src/www");
                const webSocketServer = new WebSocketServer(webServer);

                webServer.addPostHandler("/api/login", (data, cookies) => loginHandler(groupFormation, data, cookies));

                webServer.addGetHandler("/api/me", (data, cookies) => meHandler(groupFormation, data, cookies));
                webServer.addGetHandler("/api/mygroup", (data, cookies) => mygroupHandler(groupFormation, data, cookies));
                webServer.addGetHandler("/api/rankedgroups", (data, cookies) => rankedgroupsHandler(groupFormation, data, cookies));
                webServer.addGetHandler("/api/leavegroup", (data, cookies) => leavegroupHandler(webSocketServer, groupFormation, data, cookies));
                webServer.addPostHandler("/api/invitegroup", (data, cookies) => invitegroupHandler(webSocketServer, groupFormation, data, cookies));



                webServer.run()
                    .then(() => console.log(`Server running on ${config.hostname}:${config.port}`))
                    .catch(() => console.error("Could not start server!"));
            }
        });
    }
});


/**
 * @param {GroupFormation} groupFormation
 * @param {any} data
 * @param {Cookies} cookies
 */
function loginHandler(groupFormation, data, cookies) {
    if (typeof data.username !== "string") {
        throw new HttpError(400, "Invalid username");
    }

    if (!groupFormation.students.some((s) => s.name === data.username)) {
        throw new HttpError(400, "This student does not exist");
    }

    cookies.set("session", data.username, {sameSite: true});
}

function meHandler(groupFormation, data, cookies) {
    const session = cookies.get("session");

    if (session === undefined) {
        throw new HttpError(403, "Missing session cookie");
    }

    const student = getStudent(groupFormation, session);

    return student.toStudent();
}

/**
 * @param {GroupFormation} groupFormation
 * @param {any} data
 * @param {Cookies} cookies
 */
function mygroupHandler(groupFormation, data, cookies) {
    const session = cookies.get("session");

    if (session === undefined) {
        throw new HttpError(403, "Missing session cookie");
    }

    const student = getStudent(groupFormation, session);
    const group = student.group;

    const groupToSend = group.toGroup();
    groupToSend.invitations = group.invitations.map((g) => g.id);

    return groupToSend;
}

function rankedgroupsHandler(groupFormation, data, cookies) {
    const session = cookies.get("session");

    if (session === undefined) {
        throw new HttpError(403, "Missing session cookie");
    }

    const student = getStudent(groupFormation, session);
    const group = student.group;

    const candidates = group.candidates();
    const rankedGroups = group.valueGroups(candidates);

    const arr = [];

    for (let [g, value] of rankedGroups.entries()) {
        const newGroup = g.toGroup();
        newGroup.isInvited = g.invitations.some((g) => g === group);
        arr.push({group: newGroup, value});
    }

    const values = arr.map((pair) => pair.value);
    const min = Math.min(...values);
    const max = Math.max(...values);

    return arr.map((pair) => { pair.value = mapRange(pair.value, min, max, 0, 10); return pair });
}

function leavegroupHandler(webSocketServer, groupFormation, data, cookies) {
    const session = cookies.get("session");

    if (session === undefined) {
        throw new HttpError(403, "Missing session cookie");
    }

    const student = getStudent(groupFormation, session);
    student.leave();

    webSocketServer.broadcastMessage("update");
}

function invitegroupHandler(webSocketServer, groupFormation, data, cookies) {
    const session = cookies.get("session");

    if (session === undefined) {
        throw new HttpError(403, "Missing session cookie");
    }

    if (typeof data.groupid === "undefined") {
        throw new HttpError(400, "Missing groupid");
    }

    const groupid = Number(data.groupid);


    const student = getStudent(groupFormation, session);

    const group = groupFormation.groups.find((g) => g.id === groupid);

    if (group === undefined) {
        throw new HttpError(500, "could not group to invite");
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

function getStudent(groupFormation, name) {
    const student = groupFormation.students.find((s) => s.name === name);
    if (student === undefined) {
        throw new HttpError(400, "student name is invalid");
    }
    else {
        return student;
    }
}

function convertStudents(students) {
    students.forEach((s) => {
        s.__proto__ = Student.prototype;
        s.criteria.__proto__ = Criteria.prototype;
    });
    return students;
}

function configToAlgorithmFunction(config) {
    switch (config.algorithm) {
        case "random": return () => Math.random();
        case "0point": return balance;
        case "distance": return maxDistance;
        case "amalgemation": return (criteria) => 22 - maxDistance(criteria) + balance(criteria);
    }

    console.error("Unknown algorithm");
}
