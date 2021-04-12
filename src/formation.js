const {Group, Student, Criteria} = require("./group");
const {removeItemFromArray, mapRange} = require("./math");
const typeassert = require("./typeassert");

/**
 * @description Group formation module
 * @module formation
 * @see module:formation
 * @author mads256h
 */

/**
 * @summary Represents the group formation process
 * @property {number} maxGroupSize The maximum number of students allowed in a group
 * @property {number} nextGroupId The next group ID
 * @property {FMStudent[]} students An array of students
 * @property {FMGroup[]} groups An array of groups
 */
class GroupFormation {
    /**
     * @param {Student[]} students Array of students
     * @param {number} maxGroupSize The maximum number of students allowed in a group
     * @param {WeightedCriteria} weightedCriteria How much a criteria is weighted
     */
    constructor(students, maxGroupSize, weightedCriteria) {
        typeassert.assertArray(students);
        typeassert.assertArrayItemsInstanceOf(students, Student);
        typeassert.assertInstanceOf(weightedCriteria, WeightedCriteria);

        this.weightedCriteria = weightedCriteria;
        this.maxGroupSize = maxGroupSize;
        this.nextGroupId = 0;

        // Make every student a FM student and save it in an array
        this.students = this.makeStudents(students);
        this.groups = this.makeGroups(this.students);
    }

    /**
     * @summary Removes a student from a group
     * @param {FMStudent} student The student to remove from a group
     * @param {FMGroup} group The group to remove the student from
     */
    removeStudentFromGroup(student, group) {
        typeassert.assertInstanceOf(student, FMStudent);
        typeassert.assertInstanceOf(group, FMGroup);

        removeItemFromArray(student, group.students);

        this.groups.push(new FMGroup(student.name, this.nextGroupId++, [student], this, true));
    }

    /**
     * @summary Merge two groups to a single group
     * @param {FMGroup} a The group to merge with b
     * @param {FMGroup} b The group to merge with a
     */
    mergeGroup(a, b) {
        typeassert.assertInstanceOf(a, FMGroup);
        typeassert.assertInstanceOf(b, FMGroup);

        removeItemFromArray(a, this.groups);
        removeItemFromArray(b, this.groups);

        this.groups.push(a.merge(b, true));
    }

    /**
     * @private
     * @summary Convert Students to FMStudents
     * @param {Student[]} students The students to convert
     * @returns {FMStudent[]} The converted students
     */
    makeStudents(students) {
        return students.map((s) => new FMStudent(s, this));
    }

    /**
     * @private
     * @summary Create one-man groups from an array of FMStudents
     * @param {FMStudent[]} students The students from which to create the groups from
     * @returns {FMGroup[]} The groups
     */
    makeGroups(students) {
        return students.map((s) => new FMGroup(s.name, this.nextGroupId++, [s], this, true));
    }
}


/**
 * @summary Weighś criteria and gives them a score
 */
class WeightedCriteria {
    constructor(config, algorithm) {
        typeassert.assertFunction(algorithm);

        this.algorithm = algorithm;

        Object.freeze(this);
    }

    /**
     * @summary Get the score of a set of criteria
     * @param {Criteria[]} criteria The set of criteria to get the score of
     * @returns {number} The score of the set of criteria
     */
    score(criteria) {
        const {homogenous, heteogenius} = this.asNumberArrays(criteria);

        return this.algorithm(heteogenius);
    }

    /**
     * @private
     * @summary Weigh criteria
     * @param {Criteria[]} criteria The criteria to weigh
     * @returns {Criteria[]} Weighed criteria
     */
    weighCriteria(criteria) {
        typeassert.assertArray(criteria);
        typeassert.assertArrayItemsInstanceOf(criteria, Criteria);

        // TODO: Do the magic ;)
        return criteria;
    }

    /**
     * @private
     * @summary Get criteria as number arrays
     * @param {Criteria[]} criteria The criteria to get as number arrays
     * @returns {Array} The criteria as numbers
     */
    asNumberArrays(criteria) {
        const heteogenius = criteria.map((c) =>
            [
                c.learningStyles.activeReflective,
                c.learningStyles.visualVerbal,
                c.learningStyles.sensingIntuitive,
                c.learningStyles.sequentialGlobal
            ]
                .map((a) => mapRange(a, -11, 11, -1, 1)));

        return {homogenous: [[]], heteogenius};
    }

}

/**
 * @summary An extension of group for use in the group formation process
 * @property {FMGroup} invitations
 */
class FMGroup extends Group {
    constructor(name, id, students, groupFormation, isUsed = false) {
        super(name, id, students);

        this.groupFormation = groupFormation

        if (isUsed) {
            students.forEach((s) => s.group = this);
        }

        this.invitations = [];
    }


    /**
     * @summary The score of this group
     * @returns {number} The score
     */
    score() {
        return this.groupFormation.weightedCriteria.score(this.students.map((s) => s.criteria));
    }

    /**
     * @summary Merge this group with another without modifying either
     * @param {FMGroup} group The group to merge with
     * @param {boolean} isUsed Makes sure that the merged gruop, isn't actually merged
     * @returns {FMGroup} A new group that is a result of merging this group and group
     */
    merge(group, isUsed = false) {
        return new FMGroup(
            this.name + group.name,
            this.groupFormation.nextGroupId++,
            this.students.concat(group.students),
            this.groupFormation,
            isUsed
        );
    }

    /**
     * @summary Receive an invitation from group
     * @param {FMGroup} group The group to receive the invitation from
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
        return this.groupFormation.groups.filter((g) =>
            this !== g
            && this.students.length + g.students.length <= this.groupFormation.maxGroupSize);
    }


    /**
     * @summary A list of groups with a score dertermining the value of the merge with this group and the group in the list
     * @param {FMGroup[]} candidates Array of candidates
     * @returns {Map.<FMGroup,number>} Valued groups
     */
    valueGroups(candidates) {
        typeassert.assertArray(candidates);
        typeassert.assertArrayItemsInstanceOf(candidates, FMGroup);

        const valueMap = new Map();
        candidates.forEach((g) => valueMap.set(g, this.merge(g).score()));

        return valueMap;
    }

    /**
     * Makes FMGroup to a non FM group
     * @returns {group} A non FM group
     */
    toGroup() {
        return new Group(this.name, this.id, this.students.map((s) => s.toStudent()));
    }

}


/**
 * @summary An extended Student class used in the group formation process
 * @property {GroupFormation} groupformation the groupFormation object
 */
class FMStudent extends Student {
    constructor(student, groupFormation) {
        typeassert.assertInstanceOf(student, Student);
        typeassert.assertInstanceOf(groupFormation, GroupFormation);

        super(student.name, student.criteria);

        this.groupFormation = groupFormation;
    }

    leave() {
        this.groupFormation.removeStudentFromGroup(this, this.group);
    }

    toStudent() {
        return new Student(this.name, this.criteria);
    }
}

module.exports = {GroupFormation, WeightedCriteria, FMGroup, FMStudent};
