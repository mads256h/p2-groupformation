module.exports = {Group, Student, Criteria, LearningStyles, SubjectPreference, Subject};
const typeassert = require("./typeassert");


/**
 * @description Group, student and criteria module.
 * @module group
 * @see module:group
 */


/**
 * @summary Represents a group of students
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

        Object.freeze(this);
    }
}

/**
 * @summary Represents a student with name and criteria
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

        Object.freeze(this);
    }
}

/**
 * @summary Represents criteria for the students
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

        Object.freeze(this);
    }
}

/**
 * @summary Represents the learning styles of the student
 */
class LearningStyles {

    /**
     * @param {number} activeReflective The student's position on the active-reflective dimension
     * @param {number} visualVerbal The student's position on the visual-verbal dimension
     * @param {number} sensingIntuitive The student's position on the sensing-intuitive dimension
     * @param {number} sequentialGlobal The student's position on the sequential-global dimension
     */
    constructor(activeReflective, visualVerbal, sensingIntuitive, sequentialGlobal) {
        function validateParameter(parameter) {
            typeassert.assertNumber(parameter);
            typeassert.assertInteger(parameter);
            typeassert.assertRangeInclusive(parameter, -11, 11);
        }

        validateParameter(activeReflective);
        validateParameter(visualVerbal);
        validateParameter(sensingIntuitive);
        validateParameter(sequentialGlobal);

        this.activeReflective = activeReflective;
        this.visualVerbal = visualVerbal;
        this.sensingIntuitive = sensingIntuitive;
        this.sequentialGlobal = sequentialGlobal;

        Object.freeze(this);
    }
}

/**
 * @summary The subject preference of the student
 */
class SubjectPreference {
    /**
     * @param {Subject[]} subjects Subjects with score denoting preference
     */
    constructor(subjects) {
        typeassert.assertArray(subjects);
        typeassert.assertArrayItemsInstanceOf(subjects, Subject);

        this.subjects = subjects;

        Object.freeze(this);
    }
}

/**
 * @summary A subject with a score denoting preference
 */
class Subject {
    /**
     * @param {string} name Name of the subject
     * @param {number} score Score denoting the student's preference
     */
    constructor(name, score) {
        typeassert.assertString(name);
        typeassert.assertNumber(score);
        typeassert.assertRangeInclusive(score, 0, 1);

        this.name = name;
        this.score = score;

        Object.freeze(this);
    }
}
