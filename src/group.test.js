const {Group, Student, Criteria, LearningStyles, SubjectPreference, Subject} = require("./group");

test("Group", () => {
    const subject = new Subject("IMPR", 1);
    const subjectPreference = new SubjectPreference([subject]);
    const learningStyles = new LearningStyles(0, 0, 0, 0);
    const criteria = new Criteria(0, 0, learningStyles, subjectPreference);
    const student = new Student("test", criteria);

    expect(() => new Group("test", 0, [student])).not.toThrow();

    const group = new Group("test", 123, [student]);

    expect(group.name).toBe("test");

    expect(group.id).toBe(123);

    expect(group.students).toStrictEqual([student]);
});