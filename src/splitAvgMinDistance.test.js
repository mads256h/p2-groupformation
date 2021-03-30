const {splitAvgMinDistance} = require("./splitAvgMinDistance.js");

test("Return values of splitAvgMinDistance", () => {
    
    let cToSeks = [[9, 7, 9, 3],[5, -3, 1, -5],[1, 5, 5, -3],[-5, -7, 3, -9],[7, -7, 11, -9],[1, 5, 5, -7],[9, 5, 5, -3]];
    let testGroup1 = [[7],[-4]];
    let testGroup2 = [[7, 9, -10, 7],[-4, 10, -9, 1], [9, 9, 9, 9], [1, 1, 1, 1]];

    expect(splitAvgMinDistance(cToSeks)).toBe(1.071428571);
    expect(splitAvgMinDistance(testGroup1)).toBe(11);
    expect(splitAvgMinDistance(testGroup2)).toBe(2.8125);
});