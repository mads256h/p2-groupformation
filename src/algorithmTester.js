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
        groupArray.push(new Group(index.toString(), index, students.splice(0, 1)));
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
    arrayRemove(groupArr, g1);
    arrayRemove(groupArr, g2);
    groupArr.push(group);
}

/**
 * @summary Removes elements from an array
 * @param {Array} arr The array you are removing elements from.
 * @param {any} value The element that needs to be removed.
 * @returns {Array} returns the new array with the element removed.
 */
function arrayRemove(arr, value) {
    return arr.filter((element) => {return element !== value;});
}

let groups = groupMaker(studentArray);

mergeGroup(groups, groups[0], groups[1]);

for (const group of groups) {
    console.log(group.name);
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