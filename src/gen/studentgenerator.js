#!/usr/bin/node

const {Student, Criteria, LearningStyles, Subject, SubjectPreference} = require("../group");
const {assertArray, assertArrayItemsInstanceOf, assertString, assertStringNotEmpty} = require("../typeassert");
const fs = require("fs");

const argv = process.argv.splice(2);

if (argv.length !== 3){
    console.log(`USAGE: ${process.argv[0]} ${process.argv[1]} <num students> <num subjects> <filename>`);
    process.exit(1);
}

/**
 * @summary Generate randomized students
 * @param {number} numStudents Number of students to be generated
 * @param {number} numSubjects Number of subjects to be generated
 * @returns {Student[]} An array of students
 */
function generateStudents(numStudents, numSubjects){
    const studentArray = [];
    for (let i = 0; i < numStudents; i++) {
        studentArray.push(studentGenerator(i.toString(), numSubjects));
    }

    return studentArray;
}


/**
 * @summary Generate a randomized student
 * @param {string} name The students name
 * @param {number} numSubjects The number of subjects
 * @returns {Student} A randomized student
 */
function studentGenerator(name, numSubjects) {
    return new Student(name, criteriaGenerator(numSubjects));
}


/**
 * @summary Generate a randomized criteria object
 * @param {number} numSubjects The number of subjects
 * @returns {Criteria} A randomized criteria object
 */
function criteriaGenerator(numSubjects) {
    return new Criteria(
        Math.floor(Math.random() * 10) + 1, // ambitions
        Math.floor(Math.random() * 3) - 1, // workingAtHome
        learningStylesGenerator(),
        subjectPreferenceGenerator(numSubjects));
}


/**
 * @summary Generate randomized learningstyles
 * @returns {LearningStyles} Randomized learningstyles
 */
function learningStylesGenerator() {
    return new LearningStyles(lsGenerator(), lsGenerator(), lsGenerator(), lsGenerator());
}

/**
 * @summary Generate an odd number between -11 and 11 inclusive
 * @returns {number} The generated number
 */
function lsGenerator(){
    return (Math.floor(Math.random() * 12) * 2)  - 11;
}


/**
 * @summary Generate randomized subjectpreferences
 * @param {number} numSubjects The number of subjects
 * @returns {SubjectPreference} Randomized subjectpreferences
 */
function subjectPreferenceGenerator(numSubjects){
    const subjects = [];
    for (let i = 0; i < numSubjects; i++) {
        subjects.push(subjectGenerator(i.toString()));
    }
    return new SubjectPreference(subjects);
}

/**
 * @summary Generate a random subject
 * @param {string} name The name of the subject
 * @returns {Subject} Randomized subject
 */
function subjectGenerator(name) {
    return new Subject(name, Math.floor((Math.random() * 3) - 1));
}


/**
 * @summary Saves students to file
 * @param {Student[]} students The students to save
 * @param {string} fileName The output filename
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

saveToFile(generateStudents(argv[0], argv[1]), argv[2]);
