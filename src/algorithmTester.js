const {balance} = require("./Algorithms/0point");
const {maxDistance} = require("./Algorithms/distance");
const {averageVectorMinDistance, averageVectorDistance} = require("./Algorithms/vectorspace");
const {Group, Student, Criteria, LearningStyles, Subject, SubjectPreference} = require("./group");
const fs = require("fs");

let studentArray = JSON.parse(fs.readFileSync("testData.JSON"));
let groupCounter = studentArray.length;

function groupMaker(students){
    const groupArray = [];
    for (let index = 0; index < groupCounter; index++) {
        groupArray.push(new Group(index.toString(), index, students[index]));
    }
    return groupArray;
}

function mergeGroup(g1, g2){
    groupCounter++;
    const students = (g1.students).concat(g2.students);
    const group = new Group(groupCounter.toString(), groupCounter, students);
    return group;
}

function arrayRemove(arr, value) {
    return arr.filter((element) => {return element !== value;});
}


