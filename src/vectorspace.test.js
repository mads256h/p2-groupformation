const {averageVectorDistance, averageVectorMinDistance} = require("./vectorspace.js");
const {constant} = require("./weightFunction.js");

test("Average vector distance throws", () => {
    expect(() => averageVectorDistance([[1,2], [2,1]], 1, constant)).not.toThrow();
    expect(() => averageVectorDistance([[1,2], [2,1]], 0, constant)).toThrow();
    expect(() => averageVectorDistance()).toThrow();
    expect(() => averageVectorDistance([[1,2],[2,1]])).toThrow();
    expect(() => averageVectorDistance("haha")).toThrow();
    expect(() => averageVectorDistance([[1,2],[2,1]], ":)")).toThrow();
    expect(() => averageVectorDistance([[1], [2,1]], 1, constant)).toThrow();
    expect(() => averageVectorDistance([[], []], 1, constant)).toThrow();
    expect(() => averageVectorDistance([], 1, constant)).toThrow();
});

test("Average vector distance values", () => {
    let testGroup;
    // test euclidean, p=2
    testGroup = [[3, 3], [5, 3]];
    expect(averageVectorDistance(testGroup, 2, constant)).toBeCloseTo(2);
    testGroup = [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1]];
    expect(averageVectorDistance(testGroup, 2, constant)).toBeCloseTo(Math.sqrt(5));
    testGroup = [[1, -2], [-1, 3], [5, 1]];
    expect(averageVectorDistance(testGroup, 2, constant)).toBeCloseTo(33.4 / 6);
    testGroup = [[-2, 6], [-6, 6], [5, -4], [10, 10], [-4, -4]];
    expect(averageVectorDistance(testGroup, 2, constant)).toBeCloseTo(12.43);

    // test manhattan, p=1
    testGroup = [[3, 3], [5, 3]];
    expect(averageVectorDistance(testGroup, 1, constant)).toBeCloseTo(2);
    testGroup = [[0, 0, 0], [1, 1, 1]];
    expect(averageVectorDistance(testGroup, 1, constant)).toBeCloseTo(3);
    testGroup = [[1, -2], [-1, 3], [5, 1]];
    expect(averageVectorDistance(testGroup, 1, constant)).toBeCloseTo(44/6);

    // test henriks wonderful p=0.5
    testGroup = [[1, 1], [3, 2]];
    expect(averageVectorDistance(testGroup, 0.5, constant)).toBeCloseTo(5.83);
    testGroup = [[1, 1], [3, 2], [3, 1]];
    expect(averageVectorDistance(testGroup, 0.5, constant)).toBeCloseTo(2.94);


    // est weight function
    testGroup = [[3, 3], [5, 3]];
    expect(averageVectorDistance(testGroup, 2, (x)=>x*2)).toBeCloseTo(4);
    testGroup = [[-2, 6], [-6, 6], [5, -4], [10, 10], [-4, -4]];
    expect(averageVectorDistance(testGroup, 2, (x)=>x*2)).toBeCloseTo(12.43*2);
});


test("Average vector minimum distance throws", () => {
    expect(() => averageVectorMinDistance([[1, 2], [2, 1]], 1, constant)).not.toThrow();
    expect(() => averageVectorMinDistance([[1, 2], [2, 1]], 0, constant)).toThrow();
    expect(() => averageVectorMinDistance()).toThrow();
    expect(() => averageVectorMinDistance([[1, 2], [2, 1]])).toThrow();
    expect(() => averageVectorMinDistance("haha")).toThrow();
    expect(() => averageVectorMinDistance([[1, 2], [2, 1]], ":)")).toThrow();
    expect(() => averageVectorMinDistance([[1], [2, 1]], 1, constant)).toThrow();
    expect(() => averageVectorMinDistance([[], []], 1, constant)).toThrow();
    expect(() => averageVectorMinDistance([], 1, constant)).toThrow();
});

test("Average vector minimum distance values", () => {
    let testGroup;
    // test euclidean, p=2
    testGroup = [[3, 3], [5, 3]];
    expect(averageVectorMinDistance(testGroup, 2, constant)).toBeCloseTo(2);
    testGroup = [[0, 0, 0, 0, 0], [1, 1, 1, 1, 1]];
    expect(averageVectorMinDistance(testGroup, 2, constant)).toBeCloseTo(Math.sqrt(5));
    testGroup = [[1, 1], [3, 2]];
    expect(averageVectorMinDistance(testGroup, 0.5, constant)).toBeCloseTo(5.83);
    testGroup = [[1, 1], [3, 2]];
    expect(averageVectorMinDistance(testGroup, 0.5, constant)).toBeCloseTo(5.83);
    testGroup = [[1, 1], [3, 2], [3, 1]];
    expect(averageVectorMinDistance(testGroup, 0.5, constant)).toBeCloseTo(4 / 3);
    testGroup = [[3, 3], [5, 3]];
    expect(averageVectorMinDistance(testGroup, 2, (x)=>x * 2)).toBeCloseTo(4);
});