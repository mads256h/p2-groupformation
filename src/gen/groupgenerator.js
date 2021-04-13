#!/usr/bin/node

const {balance} = require("../Algorithms/0point");
const {maxDistance} = require("../Algorithms/distance");
const {averageVectorMinDistance, averageVectorDistance} = require("../Algorithms/vectorspace");
const {Student, Criteria, LearningStyles, Subject, SubjectPreference} = require("../group");
const {GroupFormation, WeightedCriteria, FMGroup} = require("../formation");
const fs = require("fs");


const argv = process.argv.splice(2);

if (argv.length !== 3){
    console.log(`USAGE: ${process.argv[0]} ${process.argv[1]} <algorithm> <max groupsize> <input filename> <output filename>`);
    process.exit(1);
}

const studentArray = JSON.parse(fs.readFileSync(argv[2])).map((s) => studentToStudent(s));

const algorithm = getAlgorithm(argv[0]);
if (algorithm === null) {
    // Then you done did it
    console.error("Thats not a valid algorithm there partner");
    process.exit(1);
}

const weightedCriteria = new WeightedCriteria(null, algorithm);
const groupFormation = new GroupFormation(studentArray, Number(argv[1]), weightedCriteria);

createBestGroups();

const doneGroups = groupFormation.groups.map((g) => g.toGroup());

saveToFile(doneGroups, argv[3]);

/**
 * @summary Creates a list of groups
 */
function createBestGroups(){
    while (!isDone()) {
        const group = selectRndGroup();
        const candidates = group.valueGroups(group.candidates());
        const bestCan = bestCandidate(candidates);
        groupFormation.mergeGroup(group, bestCan);
    }
}

/**
 * @summary Chooses a random group from the group array
 * @returns {FMGroup} A random group from the array
 */
function selectRndGroup(){
    const groupsWithCandidates = groupFormation.groups.filter((g) => g.candidates().length > 0);
    return groupsWithCandidates[Math.floor(Math.random() * groupsWithCandidates.length)];
}

/**
 * @summary The function checks if every group has been made
 * @returns {boolean} Returns true when every group is made else false
 */
function isDone() {
    return groupFormation.groups.every((g) => g.candidates().length === 0);
}

/**
 * @summary Returns the group with the higest score in a map from groups to values
 * @param {Map.<FMGroup,number>} candidateScores Map from group to scoreS
 * @returns {FMGroup} best possible group
 */
function bestCandidate(candidateScores){
    let g;
    let v = -Infinity;
    for (let [group, value] of candidateScores) {
        if (v < value) {
            g = group;
            v = value;
        }
    }

    return g;
}


/**
 * @summary Function to save and name a file, containing all the created groups
 * @param {FMGroup[]} groups array of all the groups
 * @param {string} fileName the name of the file created
 */
function saveToFile(groups, fileName){
    const data = JSON.stringify(groups, null, 2);
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            throw err;
        }
        console.log("The file has been saved!");
    });
}

/**
 * @summary Get an algorithm function by name
 * @param {string} name The name of the algorithm
 * @returns {Function} The algorithm function
 */
function getAlgorithm(name) {
    if (name === "0point") {
        return balance;
    }
    else if (name === "distance") {
        return maxDistance;
    }
    else if (name === "vectorspace") {
        return averageVectorDistance;
    }
    else if (name === "vectorspacemin") {
        return averageVectorMinDistance;
    }

    // bruh you done did it
    return null;
}


/**
 * @param {Student} student A foreign student object
 * @returns {Student} A student object that is an instance of Student
 */
function studentToStudent(student){
    return new Student(student.name, criteriaToCriteria(student.criteria));
}

/**
 * @param {Criteria} criteria A foreign criteria object
 * @returns {Criteria} A criteria object that is an instance of Criteria
 */
function criteriaToCriteria(criteria) {
    return new Criteria(criteria.ambitions, criteria.workingAtHome, learningStylesToLearningStyles(criteria.learningStyles), subjectPreferenceToSubjectPreference(criteria.subjectPreference));
}

/**
 * @param {LearningStyles} learningStyles A foreign learningStyles object
 * @returns {LearningStyles} A learningStyles object that is an instance of LearningStyles
 */
function learningStylesToLearningStyles(learningStyles) {
    return new LearningStyles(learningStyles.activeReflective, learningStyles.visualVerbal, learningStyles.sensingIntuitive, learningStyles.sequentialGlobal);
}

/**
 * @param {SubjectPreference} subjectPreference A foreign subjectPreference object
 * @returns {SubjectPreference} A subjectPreference object that is an instance of SubjectPreference
 */
function subjectPreferenceToSubjectPreference(subjectPreference) {
    return new SubjectPreference(subjectPreference.subjects.map((s) => subjectToSubject(s)));
}

/**
 * @param {Subject} subject A foreign subject object
 * @returns {Subject} A subject object that is an instance of Subject
 */
function subjectToSubject(subject) {
    return new Subject(subject.name, subject.score);
}
