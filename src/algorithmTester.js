const {balance} = require("./Algorithms/0point");
const {maxDistance} = require("./Algorithms/distance");
const {averageVectorMinDistance, averageVectorDistance} = require("./Algorithms/vectorspace");
const {Group, Student, Criteria, LearningStyles, Subject, SubjectPreference} = require("./group");
const fs = require("fs");

let studentArray = JSON.parse(fs.readFileSync("testData.JSON")).map((s) => studentToStudent(s));
let groupCounter = studentArray.length;

/**
 * @summary Takes an array of students and outputs an equivalent array of groups, with 1 student in each.
 * @param {Array} students Takes an array of students as input.
 * @returns {Array} Returns an array of groups with 1 student in each.
 */
function groupMaker(students){
    const groupArray = [];
    for (let index = 0; index < groupCounter; index++) {
        groupArray.push(new Group((index + 1).toString(), (index + 1), students.splice(0, 1)));
    }
    return groupArray;
}

/**
 * @summary Merges two groups into one and removes the two groups from the array.
 * @param {Array} groupArr The array containing the groups.
 * @param {Group} g1 The group to be merged.
 * @param {Group} g2 The group to be merged.
 */
function mergeGroup(groupArr, g1, g2){
    groupCounter++;
    const students = (g1.students).concat(g2.students);
    const group = new Group(groupCounter.toString(), groupCounter, students);
    groupArr.splice(groupArr.indexOf(g1), 1);
    groupArr.splice(groupArr.indexOf(g2), 1);
    groupArr.push(group);
}

function mergeTest(g1, g2){
    const students = (g1.students).concat(g2.students);
    return new Group(groupCounter.toString(), groupCounter, students);
}

function createBestGroups(groups, algorithm){
    let done = false;
    while (!done) {
        let group;
        group = selectRndGroup(groups);
        let candidateScores = [];
        candidateScores = groupCandidates(group, groups, algorithm);
        let bestCandidate;
        bestCandidate = sortCandidate(candidateScores);
        mergeGroup(groups, group, groups[bestCandidate]);
        done = checkGroups(groups, maxSize);
    }
}

function selectRndGroup(groups){
    return groups[Math.floor(Math.random() * groups.length())];
}

function groupCandidates(g, groups, algorithm){
    const groupScores = [];
    for (let j = 0; j < groups.length; j++) {
        if (g !== j) {
            const group = mergeTest(groups[g], groups[j]);
            const testyBoi = [];
            for (let k = 0; k < group.students.length; k++) {
                testyBoi.push(convertLS(group.students[k].criteria.learningStyles));
            }
            groupScores.push([j, algorithm(testyBoi)]);
        }
    }
    return groupScores;
}

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function convertLS(LS){
    const lsArray = [];
    for (const [key, value] of Object.entries(LS)) {
        lsArray.push(mapRange(value, -11, 11, -1, 1));
    }
    return lsArray;
}

let groups = groupMaker(studentArray);

let scores = testAlgorithm(groups, balance);

for (const score of scores) {
    console.log(score);
}

mergeGroup(groups, groups[0], groups[1]);






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