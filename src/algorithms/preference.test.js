const { preferenceAlg } = require("./preference.js");

test("Return values of preferenceAlgorithm", () => {
    expect(preferenceAlg([0, 1, 0, 0])).toBeCloseTo(0);
    expect(preferenceAlg([-1, -1, -1, -1])).toBeCloseTo(0);
    expect(preferenceAlg([-1, 1, -1, -1])).toBeCloseTo(-1 / 3);
    expect(preferenceAlg([1, 1, -1, -1])).toBeCloseTo(-1);
    expect(preferenceAlg([0.00000000001, 0.0000000000001, -0.0000000000001, 0])).toBeCloseTo(-1 / 2);
    expect(preferenceAlg([10000000000000000000000, 45781264781263481274879, -518571784621379846, 0])).toBeCloseTo(-1 / 2);
});

test("Preference algorithm throws", () => {
    expect(() => preferenceAlg([0, 1, 0, 0, "s"])).toThrow(TypeError);
    expect(() => preferenceAlg([])).toThrow(RangeError);
    expect(() => preferenceAlg([[2,2], [2,2], [2,2], [2,2]])).toThrow(TypeError);
});