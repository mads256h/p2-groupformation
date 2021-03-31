#!/usr/bin/node

const {Student, Criteria, LearningStyles, Subject, SubjectPreference} = require("./group");
const {assertArray, assertArrayItemsInstanceOf, assertString, assertStringNotEmpty} = require("./typeassert");
const fs = require("fs");

const argv = process.argv.splice(2);

if (argv.length !== 3){
    throw new RangeError("Wrong number of arguments");
}

/**
 * @summary A function used to generate a randomized student, these will be destributed into groups
 * @param {number} numOfStudents Number of students to be generated.
 * @param {number} numOfSubjects Number of subjects to be generated.
 * @returns {Student[]} returns an array of students.
 */
function studentGenerator(numOfStudents, numOfSubjects){
    const studentArray = [];
    for (let index = 0; index < numOfStudents; index++) {
        const learningStyle = new LearningStyles(lsGenerator(), lsGenerator(), lsGenerator(), lsGenerator());
        const criteria = new Criteria(Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 3), learningStyle, subjectGenerator(numOfSubjects));
        studentArray.push(new Student((index + 1).toString(), criteria));
    }
    return studentArray;
}

/**
 * @summary A function to generate proper random learning style numbers for testing purposes
 * @returns {number} The return is a random learning style number
 */
function lsGenerator(){
    const ls = [-11, -9, -7, -5, -3, -1, 1, 3, 5, 7, 9, 11];
    return ls[Math.floor(Math.random() * 12)];
}

/**
 * @summary Generates an array of subjects, which is used when generating students
 * @param {number} numOfSubjects Number of subjects to be generated.
 * @returns {SubjectPreference} Returns an array of subjects.
 */
function subjectGenerator(numOfSubjects){
    const subjects = [];
    for (let index = 0; index < numOfSubjects; index++) {
        subjects.push(new Subject((index + 1).toString(), Math.random()));
    }
    return new SubjectPreference(subjects);
}

/**
 * @summary Saves all of the students into a json file.
 * @param {Student[]} students Takes an array of students as input.
 * @param {string} fileName Input to dictate name of file that is saved.
 */
function saveToFile(students, fileName){
    assertArray(students);
    assertArrayItemsInstanceOf(students, Student);
    assertString(fileName);
    assertStringNotEmpty(fileName);

    const data = JSON.stringify(students, null, 2);
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            throw err;
        }
        console.log("The file has been saved!");
    });
}

saveToFile(studentGenerator(argv[0], argv[1]), argv[2]);
