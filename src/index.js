#!/usr/bin/node

const {WebServer, HttpError} = require("./webserver");
const {Student, Criteria, LearningStyles, SubjectPreference, Subject} = require("./group");
const {GroupFormation, WeightedCriteria} = require("./formation");
const fs = require("fs");
const typeassert = require("./typeassert");
const {balance} = require("./algorithms/0point");
const {maxDistance} = require("./algorithms/distance");
const {splitAvgMinDistance} = require("./algorithms/splitAvgMinDistance");
const {averageVectorMinDistance, averageVectorDistance} = require("./algorithms/vectorspace");
const weightFunctions = require("./algorithms/weightFunction");

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

                webServer.addPostHandler("/login", (data, cookies) => loginHandler(groupFormation, data, cookies));


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

    cookies.set("session", data.username);
}

function convertStudents(students) {
    students.forEach((s) => {
        s.__proto__ = Student.prototype;
        s.criteria.__proto__ = Criteria.prototype;
    });
    return students;
}

function configToAlgorithmFunction(config) {
    switch(config.algorithm) {
        case "random": return () => Math.random();
        case "0point": return balance;
        case "distance": return maxDistance;
        case "amalgemation": return (criteria) => 22 - maxDistance(criteria) + balance(criteria);
    }

    console.error("Unknown algorithm");
}
