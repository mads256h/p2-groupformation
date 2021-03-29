const {averageVectorDistance, averageVectorMinDistance} = require("./vectorspace.js");

test("Average vector distance throws", () => {
    expect(() => averageVectorDistance([[1,2], [2,1]], 1)).not.toThrow();
    expect(() => averageVectorDistance([[1,2], [2,1]], 0)).toThrow();
    expect(() => averageVectorDistance()).toThrow();
    expect(() => averageVectorDistance([[1,2],[2,1]])).toThrow();
    expect(() => averageVectorDistance("haha")).toThrow();
    expect(() => averageVectorDistance([[1,2],[2,1]], ":)")).toThrow();
    expect(() => averageVectorDistance([[1], [2,1]], 1)).toThrow();
    expect(() => averageVectorDistance([[], []], 1)).toThrow();
    expect(() => averageVectorDistance([], 1)).toThrow();
});

test("Average vector distance values", () => {
    let testGroup;
    //test euclidean, p=2
    testGroup = [[3,3], [5,3]];
    expect(averageVectorDistance(testGroup, 2)).toBeCloseTo(2);
    testGroup = [[0,0,0,0,0], [1,1,1,1,1]];
    expect(averageVectorDistance(testGroup, 2)).toBeCloseTo(Math.sqrt(5));
    testGroup = [[1,-2], [-1,3], [5,1]];
    expect(averageVectorDistance(testGroup, 2)).toBeCloseTo(33.4 / 6);
    testGroup = [[-2,6], [-6,6], [5,-4], [10, 10], [-4, -4]];
    expect(averageVectorDistance(testGroup, 2)).toBeCloseTo(12.43);

    //test manhattan, p=1
    testGroup = [[3,3], [5,3]];
    expect(averageVectorDistance(testGroup, 1)).toBeCloseTo(2);
    testGroup = [[0,0,0], [1,1,1]];
    expect(averageVectorDistance(testGroup, 1)).toBeCloseTo(3);
    testGroup = [[1,-2], [-1,3], [5,1]];
    expect(averageVectorDistance(testGroup, 1)).toBeCloseTo(44/6);

    //test henriks wonderful p=0.5
    testGroup = [[1,1], [3,2]];
    expect(averageVectorDistance(testGroup, 0.5)).toBeCloseTo(5.83);
    testGroup = [[1,1], [3,2], [3,1]];
    expect(averageVectorDistance(testGroup, 0.5)).toBeCloseTo(2.94);

});