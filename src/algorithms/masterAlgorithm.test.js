const { masterAlg } = require("./masterAlgorithm.js");

test("Return values of masterAlg", () => {
    const testCriteria = [[[1]], [[2]], [[3]]]; // List of most basic criteria arrays
    expect(masterAlg(()=>9, ()=>9, ()=>9, ...testCriteria)).toBeCloseTo(27);
    expect(masterAlg(()=>0,()=>0,()=>0, ...testCriteria)).toBeCloseTo(0);
    expect(masterAlg((x) => x[0][0], (y) => 2 * y[0][0], (z) => 3 * z[0][0], ...testCriteria)).toBeCloseTo(1 + 4 + 9);
});

test("masterAlg throws", () => {
    const testCriteria = [[[1]], [[2]], [[3]]]; // List of most basic valid criteria arrays
    expect(() => masterAlg(3,3,3, ...testCriteria)).toThrow(TypeError);
    expect(() => masterAlg([])).toThrow(TypeError);
    expect(() => masterAlg()).toThrow(TypeError);
    expect(() => masterAlg("s",()=>2,()=>3, ...testCriteria)).toThrow(TypeError);
    expect(() => masterAlg(3,()=>2,()=>3, ...testCriteria)).toThrow(TypeError);
    expect(() => masterAlg(()=>0,()=>0,()=>0)).toThrow(TypeError);
    expect(() => masterAlg(()=>0,()=>0,()=>0, 1, 2, 3)).toThrow(TypeError);
    expect(() => masterAlg(()=>0,()=>0,()=>0, [[1]], [[2]], [2])).toThrow(TypeError);
    expect(() => masterAlg(()=>0,()=>0,()=>0, [[1]], [[2]], [[3], [3,2]])).toThrow(RangeError);
});