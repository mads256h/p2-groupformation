module.exports = {Group, Student, Criteria, LearningStyles, SubjectPreference, Subject};
const typecheck = require("./typecheck");

class Group {
    constructor(name, id, students){
        typecheck.isString(name);
        typecheck.isNumber(id);
        typecheck.isInteger(id);
        typecheck.isArray(students);
        typecheck.arrayItemsIsInstance(students, Student);

        this.name = name;
        this.id = id;
        this.students = students;

        Object.freeze(this);

    }
}

class Student {
    constructor(name, criteria){
        typecheck.isString(name);
        typecheck.isInstance(criteria, Criteria);

        this.name = name;
        this.criteria = criteria;

        Object.freeze(this);
    }
}

class Criteria {
    constructor(ambitions, workingAtHome, learningStyles, subjectPreference) {

        typecheck.isInteger(ambitions);
        typecheck.isInteger(workingAtHome);
        typecheck.isInstance(learningStyles, LearningStyles);
        typecheck.isInstance(subjectPreference, SubjectPreference);

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
            typecheck.isNumber(parameter);
            typecheck.isInteger(parameter);
            typecheck.range(parameter, -11, 11);
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
        typecheck.isArray(subjects);
        typecheck.arrayItemsIsInstance(subjects, Subject);

        this.subjects = subjects;

        Object.freeze(this);
    }
}

class Subject {
    constructor(name, score) {
        typecheck.isString(name);
        typecheck.isNumber(score);
        typecheck.range(score, 0, 1);

        this.name = name;
        this.score = score;

        Object.freeze(this);
    }
}