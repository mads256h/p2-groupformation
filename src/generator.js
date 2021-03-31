const {Student, Criteria, LearningStyles, Subject, SubjectPreference} = require("./group");
const fs = require("fs");

let argv = process.argv.splice(2);

/**
 * @summary A function used to generate a randomized student, these will be destributed into groups
 * @returns {Array} returns an array of students.
 */
function studentGenerator(){
    let learningStyle;
    let criteria;
    let studentArray = [];
    for (let index = 0; index < argv[0]; index++) {
        learningStyle = new LearningStyles(lsGenerator(), lsGenerator(), lsGenerator(), lsGenerator());
        criteria = new Criteria(Math.floor(Math.random()*10)+1, Math.floor(Math.random()*3), learningStyle, subjectGenerator());
        studentArray.push(new Student((index+1).toString(), criteria));
    }
    return studentArray;
}

/**
 * @summary A function to generate proper random learning style numbers for testing purposes
 * @returns {number} The return is a random learning style number
 */
function lsGenerator(){
    let ls = [-11, -9, -7, -5, -3, -1, 1, 3, 5, 7, 9, 11];
    return ls[Math.floor(Math.random()*12)];
}

/**
 * @summary Generates an array of subjects, which is used when generating students
 * @returns {SubjectPreference} Returns an array of subjects.
 */
function subjectGenerator(){
    let subjects = [];
    for (let index = 0; index < argv[1]; index++) {
        subjects.push(new Subject((index+1).toString(), Math.random()));
    }
    return new SubjectPreference(subjects);
}

/**
 * @summary Saves all of the students into a json file.
 * @param {Array} students Takes an array of students as input.
 */
function saveToFile(students){
    let data = JSON.stringify(students, null, 2);
    fs.writeFile("Students.JSON", data, (err) => {
        if (err) {
            throw err;
        }
        console.log("The file has been saved!");
    });
}



saveToFile(studentGenerator());