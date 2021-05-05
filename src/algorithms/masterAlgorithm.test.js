const { masterAlg } = require("./masterAlgorithm.js");

test("Return values of masterAlg", () => {
    const testCriteria = [[[1]], [[2]], [[3]]]; // List of most basic criteria arrays
    const testWeights = {heterogenous: 1, homogenous: 2, subjects: 4};
    expect(masterAlg(()=>9, ()=>9, ()=>9, ...testCriteria, testWeights)).toBeCloseTo(9 + 2 * 9 + 4 * 9);
    expect(masterAlg(()=>0,()=>0,()=>0, ...testCriteria, testWeights)).toBeCloseTo(0);
    expect(masterAlg((x) => x[0][0], (y) => 2 * y[0][0], (z) => 3 * z[0][0], ...testCriteria, testWeights)).toBeCloseTo(1 + 4 * 2 + 9 * 4);
});

test("masterAlg throws", () => {
    const testCriteria = [[[1]], [[2]], [[3]]]; // List of most basic valid criteria arrays
    const testWeights = {heterogenous: 1, homogenous: 1, subjects: 1};
    expect(() => masterAlg(3,3,3, ...testCriteria, testWeights)).toThrow(TypeError);
    expect(() => masterAlg([])).toThrow(TypeError);
    expect(() => masterAlg()).toThrow(TypeError);
    expect(() => masterAlg("s",()=>2,()=>3, ...testCriteria, testWeights)).toThrow(TypeError);
    expect(() => masterAlg(3,()=>2,()=>3, ...testCriteria, testWeights)).toThrow(TypeError);
    expect(() => masterAlg(()=>0,()=>0,()=>0)).toThrow(TypeError);
    expect(() => masterAlg(()=>0,()=>0,()=>0, 1, 2, 3)).toThrow(TypeError);
    expect(() => masterAlg(()=>0,()=>0,()=>0, [[1]], [[2]], [2], testWeights)).toThrow(TypeError);
    expect(() => masterAlg(()=>0,()=>0,()=>0, [[1]], [[2]], [[3], [3,2]], testWeights)).toThrow(RangeError);
});