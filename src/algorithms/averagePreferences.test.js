const { averagePreferenceAlg } = require("./averagePreferences.js");

test("Return values of subjects Algorithm", () => {
    expect(averagePreferenceAlg([[0, 1, 0, 0], [0, 1, 0, 0]])).toBeCloseTo(0);
    expect(averagePreferenceAlg([[0, 0, 0], [0, 0, 0]])).toBeCloseTo(0);
    expect(averagePreferenceAlg([[-1, -1, -1, -1], [-1, -1, -1, -1]])).toBeCloseTo(0);
    expect(averagePreferenceAlg([[-1, 1, -1, -1], [-1, 1, -1, -1]])).toBeCloseTo(-1 / 3);
    expect(averagePreferenceAlg([[1, 1, -1, -1], [1, 1, -1, -1]])).toBeCloseTo(-1);
    expect(averagePreferenceAlg([[0.00000000001, 0.0000000000001, -0.0000000000001, 0], [0.00000000001, 0.0000000000001, -0.0000000000001, 0]])).toBeCloseTo(-1 / 2);
    expect(averagePreferenceAlg([[10000000000000000000000, 45781264781263481274879, -518571784621379846, 0], [10000000000000000000000, 45781264781263481274879, -518571784621379846, 0]])).toBeCloseTo(-1 / 2);
});


test("subject algorithm throws", () => {
    expect(() => averagePreferenceAlg(1)).toThrow(TypeError);
    expect(() => averagePreferenceAlg([0, 1, 0, 0, "s"], [0, 1, -1, 0, 1])).toThrow(TypeError);
    expect(() => averagePreferenceAlg([[], []])).toThrow(RangeError);
});