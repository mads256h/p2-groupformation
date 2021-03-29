const {averageVectorDistance, averageVectorMinDistance} = require("./vectorspace.js");

test("Average vector distance values", () => {
    let testGroup = [[6.8,2.3], [4,3], [1.5,2.8], [3, 5.6], [6.5, 4.8]];
    expect(averageVectorDistance(testGroup)).toBeCloseTo(73.08, 2);
});