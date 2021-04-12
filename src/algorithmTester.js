const {balance} = require("./Algorithms/0point");
const {maxDistance} = require("./Algorithms/distance");
const {averageVectorMinDistance, averageVectorDistance} = require("./Algorithms/vectorspace");
const {Group, Student, Criteria, LearningStyles, Subject, SubjectPreference} = require("./group");
const {GroupFormation, WeightedCriteria, FMGroup, FMStudent} = require("./formation");
const fs = require("fs");

const studentArray = JSON.parse(fs.readFileSync("testData.JSON")).map((s) => studentToStudent(s));


const weightedCriteria = new WeightedCriteria(null, balance);
const groupFormation = new GroupFormation(studentArray, 7, weightedCriteria);

createBestGroups();

const doneGroups = groupFormation.groups.map((g) => g.toGroup());

console.log(JSON.stringify(doneGroups, null, 2));

function createBestGroups(){
    let done = false;
    while (!done) {
        const group = selectRndGroup();
        const candidates = group.valueGroups(group.candidates());
        const bestCan= bestCandidate(candidates);
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
