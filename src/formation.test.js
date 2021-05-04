// TODO: Test FMGroup and FMStudent
// They kinda already gets tested through GroupFormation
const {GroupFormation, WeightedCriteria} = require("./formation");
const {Student, Criteria, LearningStyles, SubjectPreference, Subject} = require("./group");


test("GroupFormation", () => {
    const weightedCriteria = new WeightedCriteria(null, () => 0);
    const learningStyles = new LearningStyles(11, -11, 7, -7);
    const criteria = new Criteria(1, 1, learningStyles, new SubjectPreference([]));
    const student1 = new Student("student1", criteria);
    const student2 = new Student("student2", criteria);

    let groupFormation;

    expect(() => new GroupFormation([], 1, null)).toThrow(TypeError);
    expect(() => new GroupFormation([0], 1, weightedCriteria)).toThrow(TypeError);
    expect(() => new GroupFormation([], "test", weightedCriteria)).toThrow(TypeError);
    expect(() => new GroupFormation([], 1.1, weightedCriteria)).toThrow(TypeError);

    expect(() => new GroupFormation([], 0, weightedCriteria)).toThrow(RangeError);
    expect(() => new GroupFormation([], -1, weightedCriteria)).toThrow(RangeError);

    expect(() => new GroupFormation([], 1, weightedCriteria)).not.toThrow();


    expect(() => groupFormation = new GroupFormation([student1, student2], 2, weightedCriteria)).not.toThrow();

    expect(groupFormation.groups[0].candidates().length).toBe(1);
    expect(groupFormation.groups[0].candidates()[0]).toBe(groupFormation.groups[1]);
    expect(groupFormation.groups[1].candidates().length).toBe(1);
    expect(groupFormation.groups[1].candidates()[0]).toBe(groupFormation.groups[0]);

    expect(() => groupFormation.mergeGroup(groupFormation.groups[0], groupFormation.groups[1])).not.toThrow();

    expect(groupFormation.groups[0].name).toBe("student1 student2");
    expect(groupFormation.groups[0].students.length).toBe(2);
    expect(groupFormation.groups[0].candidates().length).toBe(0);
});


test("WeightedCriteria", () => {
    expect(() => new WeightedCriteria(null, null)).toThrow(TypeError);
    expect(() => new WeightedCriteria(null, "test")).toThrow(TypeError);
    expect(() => new WeightedCriteria(null, 0)).toThrow(TypeError);

    expect(() => new WeightedCriteria(null, () => 0)).not.toThrow();

    expect(new WeightedCriteria(null, () => 0).score([])).toBe(0);
    expect(new WeightedCriteria(null, () => 1).score([])).toBe(1);
});


test("weighfunction", () => {
    const weightConfig = {  // valid weight object
        "heterogenous": 2,
        "homogenous": 10,
        "subjects": 100
    };
    const testCriteria = new Criteria(
        1,
        1,
        new LearningStyles(1, 1, 1, 1),
        new SubjectPreference([
            new Subject("sub1", 1),
            new Subject("sub2", 1)
        ])
    );
    const testResultCriteria = new Criteria(
        10,
        10,
        new LearningStyles(2, 2, 2, 2),
        new SubjectPreference([
            new Subject("sub1", 100),
            new Subject("sub2", 100)
        ])
    );
    const weigher = new WeightedCriteria(weightConfig, ()=>0); // dummy function is used to pass typecheck
    expect(weigher.weighCriteria(testCriteria)).toStrictEqual(testResultCriteria); // deep check that everything exists and is equal in both
});
