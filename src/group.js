module.exports = {Group, Student, Criteria, LearningStyles, SubjectPreference, Subject};
const typeassert = require("./typeassert");

class Group {
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

class Student {
    constructor(name, criteria){
        typeassert.assertString(name);
        typeassert.assertInstanceOf(criteria, Criteria);

        this.name = name;
        this.criteria = criteria;

        Object.freeze(this);
    }
}

class Criteria {
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

class LearningStyles {

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

class SubjectPreference {
    constructor(subjects) {
        typeassert.assertArray(subjects);
        typeassert.assertArrayItemsInstanceOf(subjects, Subject);

        this.subjects = subjects;

        Object.freeze(this);
    }
}

class Subject {
    constructor(name, score) {
        typeassert.assertString(name);
        typeassert.assertNumber(score);
        typeassert.assertRangeInclusive(score, 0, 1);

        this.name = name;
        this.score = score;

        Object.freeze(this);
    }
}
