const { subjectAlg } = require("./subjectPreferences.js");

test("Return values of subjects Algorithm", () => {
    expect(subjectAlg([[0, 1, 0, 0], [0, 1, 0, 0]])).toBeCloseTo(0);
    expect(subjectAlg([[0, 0, 0], [0, 0, 0]])).toBeCloseTo(0);
    expect(subjectAlg([[-1, -1, -1, -1], [-1, -1, -1, -1]])).toBeCloseTo(0);
    expect(subjectAlg([[-1, 1, -1, -1], [-1, 1, -1, -1]])).toBeCloseTo(-1 / 3);
    expect(subjectAlg([[1, 1, -1, -1], [1, 1, -1, -1]])).toBeCloseTo(-1);
    expect(subjectAlg([[0.00000000001, 0.0000000000001, -0.0000000000001, 0], [0.00000000001, 0.0000000000001, -0.0000000000001, 0]])).toBeCloseTo(-1 / 2);
    expect(subjectAlg([[10000000000000000000000, 45781264781263481274879, -518571784621379846, 0], [10000000000000000000000, 45781264781263481274879, -518571784621379846, 0]])).toBeCloseTo(-1 / 2);
});


test("subject algorithm throws", () => {
    expect(() => subjectAlg([0, 1, 0, 0, "s"], [0, 1, -1, 0, 1])).toThrow(TypeError);
    expect(() => subjectAlg([[], []])).toThrow(RangeError);
});