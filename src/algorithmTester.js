const {balance} = require("./Algorithms/0point");
const {maxDistance} = require("./Algorithms/distance");
const {averageVectorMinDistance, averageVectorDistance} = require("./Algorithms/vectorspace");
const {Group, Student, Criteria, LearningStyles, Subject, SubjectPreference} = require("./group");
const {GroupFormation, WeightedCriteria, FMGroup, FMStudent} = require("./formation");
const fs = require("fs");


const argv = process.argv.splice(2);

if (argv.length !== 3){
    console.log(`USAGE: ${process.argv[0]} ${process.argv[1]} <Max size of group> <input filename> <output filename>`);
    process.exit(1);
}

const studentArray = JSON.parse(fs.readFileSync(argv[1])).map((s) => studentToStudent(s));

const weightedCriteria = new WeightedCriteria(null, balance);
const groupFormation = new GroupFormation(studentArray, argv[0], weightedCriteria);

createBestGroups();

const doneGroups = groupFormation.groups.map((g) => g.toGroup());

saveToFile(doneGroups, argv[2]);

function createBestGroups(){
    let done = false;
    while (!done) {
        const group = selectRndGroup();
        const candidates = group.valueGroups(group.candidates());
        const bestCan = bestCandidate(candidates);
        groupFormation.mergeGroup(group, bestCan);
        done = checkGroups();
    }
}

function selectRndGroup(){
    const groupsWithCandidates = groupFormation.groups.filter((g) => g.candidates().length > 0);
    return groupsWithCandidates[Math.floor(Math.random() * groupsWithCandidates.length)];
}

function checkGroups() {
    return groupFormation.groups.every((g) => g.candidates().length === 0);
}

/**
 * @summary Returns the group with the higest score in a map from groups to values
 * @param {map} candidateScores Map from group to scoreS
 * @returns {group} best possible group
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
 * @param {Student} student
 */
function studentToStudent(student){
    return new Student(student.name, criteriaToCriteria(student.criteria));
}

/**
 * @param {Criteria} criteria
 */
function criteriaToCriteria(criteria) {
    return new Criteria(criteria.ambitions, criteria.workingAtHome, learningStylesToLearningStyles(criteria.learningStyles), subjectPreferenceToSubjectPreference(criteria.subjectPreference));
}

/**
 * @param {LearningStyles} learningStyles
 */
function learningStylesToLearningStyles(learningStyles) {
    return new LearningStyles(learningStyles.activeReflective, learningStyles.visualVerbal, learningStyles.sensingIntuitive, learningStyles.sequentialGlobal);
}

/**
 * @param {SubjectPreference} subjectPreference
 */
function subjectPreferenceToSubjectPreference(subjectPreference) {
    return new SubjectPreference(subjectPreference.subjects.map((s) => subjectToSubject(s)));
}

/**
 * @param {Subject} subject
 */
function subjectToSubject(subject) {
    return new Subject(subject.name, subject.score);
}
