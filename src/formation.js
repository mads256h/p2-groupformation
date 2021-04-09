const {Group, Student} = require("./group");
const typeassert = require("./typeassert");


class GroupFormation {

    /**
     * @param {Student[]} students
     */
    constuctor(students, weightedCriteria) {
        typeassert.assertArray(students);
        typeassert.assertArrayItemsInstanceOf(students, Student);
        typeassert.assertInstanceOf(weightedCriteria, WeightedCriteria);


        // Make every student a FM student and save it in an array
        this.students = this.makeStudents(students);
        this.groups = this.makeGroups(this.students);

        Object.freeze(this);
    }

    removeStudentFromGroup(student, group) {
        group.students.splice(group.students.indexOf(student), 1);

        groups.push(new FMGroup(student.name, 1 /* fix me */, [student]));
    }

    makeStudents(students) {
        return students.map((s) => new FMStudent(s, this));
    }

    makeGroups(students) {
        return students.map((s) => new FMGroup(s.name, 1 /* fix me */, [s]));
    }
};


class WeightedCriteria {

    constructor(config, algorithm) {


    }

}

class FMGroup extends Group {

    constructor(name, id, students) {
        base(name, id, students);

        this.invitations = [];
    }


    /**
     * @summary The score of this group
     * @returns {number} The score
     */
    score() {

    }

    /**
     * @summary Merge this group with another without modifying either
     * @param {FMGroup} group The group to merge with
     * @returns {FMGroup} A new group that is a result of merging this group and group
     */
    merge(group) {
        return new FMGroup(
            this.name + group.name,
            this.id + group.id, // TODO: This is really bad fix this
            this.students.concat(group.students)
        );
    }

    /**
     * @summary Receive an invitation from group
     * @param {FMGroup} The group to receive the invitation from
     */
    receiveInvitation(group) {
        typeassert.assertInstanceOf(group, FMGroup);

        this.invitations.push(group);
    }

    /**
     * @summary A list of groups that can be merged with this group
     * @returns {FMGroup[]} Candidate groups
     */
    candidates() {

    }


    /**
     * @summary A list of groups with a score dertermining the value of the merge with this group and the group in the list
     * @param {FMGroup[]} candidates
     * @return {FMGroup[]} Valued groups
     */
    valueGroups(candidates) {
        typeassert.assertArray(candidates);
        typeassert.assertArrayItemsInstanceOf(candidates, FMGroup);
    }

}


class FMStudent extends Student {
    constructor(student, groupFormation) {
        typeassert.assertInstanceOf(student, Student);

        base(student.name, student.criteria);

        this.groupFormation = groupFormation;
    }

    leave(group) {
        typeassert.assertInstanceOf(group, FMGroup);

        this.groupFormation.removeStudentFromGroup(this, group);
    }
}


