const {Group, Student, Criteria, LearningStyles, SubjectPreference, Subject} = require("./group");

let argv = process.argv;

/**
 * @summary A function used to generate a randomized student, these will be destributed into groups
 * @param {number} id a number to identify the student, used instead of a name for now.
 * @returns {Student} Returns a student with randomized criteria
 */
function studentGenerator(id){
    let learningStyle = new LearningStyles(lsGenerator(), lsGenerator(), lsGenerator(), lsGenerator());
    let criteria = new Criteria(Math.random(), Math.floor(Math.random()*3), learningStyle, null);
    let student = new Student(id.toString, criteria);
    return student;
}

/**
 * @summary A function to generate proper random learning style numbers for testing purposes
 * @returns {number} The return is a random learning style number
 */
function lsGenerator(){
    let ls = [-11, -9, -7, -5, -3, -1, 1, 3, 5, 7, 9, 11];
    return ls[Math.floor(Math.random()*13)];
}

function groupGenerator(){
    for (let index = 0; index < argv[0]; index++) {
        console.log("hello, argv test");
    }
}

groupGenerator();