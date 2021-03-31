const {euclidDistance, lpDistance, transposeArray} = require("./math.js");


test("Euclidean distance throws", () => {
    expect(() => euclidDistance([0], [1, 1])).toThrow(RangeError);
    expect(() => euclidDistance([], [])).toThrow(RangeError);
    expect(() => euclidDistance([], [2])).toThrow(RangeError);
    expect(() => lpDistance([[2, 2], 0], [2, 4], 1)).toThrow(TypeError);
    expect(() => lpDistance([2, 0], [2, "cake"], 1)).toThrow(TypeError);
});
test("Euclidean distance test values", () => {
    expect(euclidDistance([0,0], [1,1])).toEqual(Math.sqrt(2));
    expect(euclidDistance([-1,-1], [1,1])).toEqual(2 * Math.sqrt(2));
    expect(euclidDistance([-1,0,0,0,0], [1,0,0,0,0])).toEqual(2);
});
test("lpDistance throws", () => {
    expect(() => lpDistance([0], [1, 1], 1)).toThrow(RangeError);
    expect(() => lpDistance([], [], 1)).toThrow(RangeError);
    expect(() => lpDistance([], [2], 1)).toThrow(RangeError);
    expect(() => lpDistance([2, 0], [2, 4], 0)).toThrow(RangeError);
    expect(() => lpDistance([[2, 2], 0], [2, 4], 1)).toThrow(TypeError);
    expect(() => lpDistance([2, 0], [2, "cake"], 1)).toThrow(TypeError);
});
test("lpDistance test values", () => {
    expect(lpDistance([0, 0], [1, 1], 2)).toBeCloseTo(Math.sqrt(2));
    expect(lpDistance([-1, -1], [1, 1], 2)).toBeCloseTo(2 * Math.sqrt(2));
    expect(lpDistance([-1, 0, 0, 0, 0], [1,0,0,0,0], 2)).toBeCloseTo(2);

    expect(lpDistance([0, 0], [1, 1], 1)).toBeCloseTo(2);
    expect(lpDistance([-1, -1], [1, 1], 1)).toBeCloseTo(4);
    expect(lpDistance([-1,0,0,0,0], [1,0,0,0,0], 1)).toBeCloseTo(2);

    expect(lpDistance([0, 0], [1, 1], 5)).toBeCloseTo(Math.pow(2, 1 / 5));
    expect(lpDistance([-1, -1], [1, 1], 5)).toBeCloseTo(2 * Math.pow(2, 1 / 5));
    expect(lpDistance([-1,0,0,0,0], [1,0,0,0,0], 5)).toBeCloseTo(2);

    expect(lpDistance([0, 0], [1, 1], 0.2)).toBeCloseTo(Math.pow(2, 5));
    expect(lpDistance([-1, -1], [1, 1], 0.2)).toBeCloseTo(2 * Math.pow(2, 5));
    expect(lpDistance([-1,0,0,0,0], [1,0,0,0,0], 0.2)).toBeCloseTo(2);
});


test("transposeArray", () => {
    const test1 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    const test1Outcome = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
    ];

    expect(() => transposeArray(test1)).not.toThrow();
    expect(transposeArray(test1)).toStrictEqual(test1Outcome);

    expect(() => transposeArray([])).toThrow(TypeError);
    expect(() => transposeArray({})).toThrow(TypeError);
    expect(() => transposeArray(1)).toThrow(TypeError);
    expect(() => transposeArray("test")).toThrow(TypeError);
});
