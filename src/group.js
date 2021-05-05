
const typeassert = require("./typeassert");


/**
 * @description Group, student and criteria module.
 * @module group
 * @see module:group
 * @author feybelle and mads256h
 */


/**
 * @summary Represents a group of students
 * @property {string} name The name of the group
 * @property {number} id The ID of the group
 * @property {Student[]} students The members of the group
 */
class Group {
    /**
     * @param {string} name The name of the group
     * @param {number} id The ID of the group
     * @param {Student[]} students The members of the group
     */
    constructor(name, id, students){
        typeassert.assertString(name);
        typeassert.assertNumber(id);
        typeassert.assertInteger(id);
        typeassert.assertArray(students);
        typeassert.assertArrayItemsInstanceOf(students, Student);

        this.name = name;
        this.id = id;
        this.students = students;
    }
}

/**
 * @summary Represents a student with name and criteria
 * @property {string} name The name of the student
 * @property {Criteria} criteria The student's criteria
 */
class Student {
    /**
     * @param {string} name The name of the student
     * @param {Criteria} criteria The student's criteria
     */
    constructor(name, criteria){
        typeassert.assertString(name);
        typeassert.assertInstanceOf(criteria, Criteria);

        this.name = name;
        this.criteria = criteria;
    }
}

/**
 * @summary Represents criteria for the students
 * @property {number} ambitions The ambition of the student
 * @property {number} workingAtHome How likely the student is to work at home
 * @property {LearningStyles} learningStyles The student's learning styles
 * @property {SubjectPreference} subjectPreference The student's subject preferences
 */
class Criteria {
    /**
     * @param {number} ambitions The ambition of the student
     * @param {number} workingAtHome How likely the student is to work at home
     * @param {LearningStyles} learningStyles The student's learning styles
     * @param {SubjectPreference} subjectPreference The student's subject preferences
     */
    constructor(ambitions, workingAtHome, learningStyles, subjectPreference) {
        typeassert.assertInteger(ambitions);
        typeassert.assertInteger(workingAtHome);
        typeassert.assertInstanceOf(learningStyles, LearningStyles);
        typeassert.assertInstanceOf(subjectPreference, SubjectPreference);

        this.ambitions = ambitions;
        this.workingAtHome = workingAtHome;
        this.learningStyles = learningStyles;
        this.subjectPreference = subjectPreference;
    }
}

/**
 * @summary Represents the learning styles of the student
 * @property {number} activeReflective The student's position on the active-reflective dimension
 * @property {number} visualVerbal The student's position on the visual-verbal dimension
 * @property {number} sensingIntuitive The student's position on the sensing-intuitive dimension
 * @property {number} sequentialGlobal The student's position on the sequential-global dimension
 */
class LearningStyles {
    /**
     * @param {number} activeReflective The student's position on the active-reflective dimension
     * @param {number} visualVerbal The student's position on the visual-verbal dimension
     * @param {number} sensingIntuitive The student's position on the sensing-intuitive dimension
     * @param {number} sequentialGlobal The student's position on the sequential-global dimension
     */
    constructor(activeReflective, visualVerbal, sensingIntuitive, sequentialGlobal) {
        /**
         * @param {number} parameter score for LS criteria
         */
        function validateParameter(parameter) {
            typeassert.assertNumber(parameter);
        }

        validateParameter(activeReflective);
        validateParameter(visualVerbal);
        validateParameter(sensingIntuitive);
        validateParameter(sequentialGlobal);

        this.activeReflective = activeReflective;
        this.visualVerbal = visualVerbal;
        this.sensingIntuitive = sensingIntuitive;
        this.sequentialGlobal = sequentialGlobal;
    }
}

/**
 * @summary The subject preference of the student
 * @property {Subject[]} subjects Subjects with score denoting preference
 */
class SubjectPreference {
    /**
     * @param {Subject[]} subjects Subjects with score denoting preference
     */
    constructor(subjects) {
        typeassert.assertArray(subjects);
        typeassert.assertArrayItemsInstanceOf(subjects, Subject);

        this.subjects = subjects;
    }
}

/**
 * @summary A subject with a score denoting preference
 * @property {string} name Name of the subject
 * @property {number} score Score denoting the student's preference
 */
class Subject {
    /**
     * @param {string} name Name of the subject
     * @param {number} score Score denoting the student's preference
     */
    constructor(name, score) {
        typeassert.assertString(name);
        typeassert.assertNumber(score);

        this.name = name;
        this.score = score;
    }
}

module.exports = {Group, Student, Criteria, LearningStyles, SubjectPreference, Subject};
