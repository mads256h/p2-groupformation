const {balance} = require("./Algorithms/0point");
const {maxDistance} = require("./Algorithms/distance");
const {averageVectorMinDistance, averageVectorDistance} = require("./Algorithms/vectorspace");
const {Group, Student, Criteria, LearningStyles, Subject, SubjectPreference} = require("./group");
const fs = require("fs");

let studentArray = JSON.parse(fs.readFileSync("testData.JSON"));
let groupCounter = studentArray.length;

/**
 * @summary Takes an array of students and outputs an equivalent array of groups, with 1 student in each.
 * @param {Array} students Takes an array of students as input.
 * @returns {Array} Returns an array of groups with 1 student in each.
 */
function groupMaker(students){
    const groupArray = [];
    for (let index = 0; index < groupCounter; index++) {
        groupArray.push(new Group(index.toString(), index, new Array(students[index])));
    }
    return groupArray;
}

/**
 * @summary Merges two groups into one.
 * @param {Group} g1 The group to be merged.
 * @param {Group} g2 The group to be merged.
 * @returns {Group} Returns a merged group
 */
function mergeGroup(g1, g2){
    groupCounter++;
    const students = (g1.students).concat(g2.students);
    const group = new Group(groupCounter.toString(), groupCounter, students);
    return group;
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

for (const group of groups) {
    console.log(group.name);
}