const { masterAlg } = require("./masterAlgorithm.js");

test("Return values of masterAlg", () => {
    expect(masterAlg(()=>4,()=>2,()=>3)).toBeCloseTo(9);
    expect(masterAlg(()=>9,()=>9,()=>9)).toBeCloseTo(27);
    expect(masterAlg(()=>0,()=>0,()=>0)).toBeCloseTo(0);
});

test("masterAlg throws", () => {
    expect(() => masterAlg(3,3,3)).toThrow(TypeError);
    expect(() => masterAlg([])).toThrow(TypeError);
    expect(() => masterAlg()).toThrow(TypeError);
    expect(() => masterAlg("s",()=>2,()=>3)).toThrow(TypeError);
    expect(() => masterAlg(3,()=>2,()=>3)).toThrow(TypeError);
});