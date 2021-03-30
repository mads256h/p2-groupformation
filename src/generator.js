const {Group, Student, Criteria, LearningStyles, SubjectPreference, Subject} = require("./group");

let argv = process.argv.splice(2);

/**
 * @summary A function used to generate a randomized student, these will be destributed into groups
 */
function studentGenerator(){
    let learningStyle = new LearningStyles(lsGenerator(), lsGenerator(), lsGenerator(), lsGenerator());
    let criteria = new Criteria(Math.random(), Math.floor(Math.random()*3), learningStyle, null);
    let studentArray = [];
    for (let index = 0; index < argv[0]; index++) {
        studentArray.push(new Student(index.toString, criteria));
    }
}

/**
 * @summary A function to generate proper random learning style numbers for testing purposes
 * @returns {number} The return is a random learning style number
 */
function lsGenerator(){
    let ls = [-11, -9, -7, -5, -3, -1, 1, 3, 5, 7, 9, 11];
    return ls[Math.floor(Math.random()*13)];
}