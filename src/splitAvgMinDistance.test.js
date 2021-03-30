const {splitAvgMinDistance} = require("./splitAvgMinDistance.js");

test("Return values of splitAvgMinDistance", () => {
    let cToSeks = [[9/11, 7/11, 9/11, 3/11],[5/11, -3/11, 1/11, -5/11],[1/11, 5/11, 5/11, -3/11],[-5/11, -7/11, 3/11, -9/11],[7/11, -7/11, 11/11, -9/11],[1/11, 5/11, 5/11, -7/11],[9/11, 5/11, 5/11, -3/11]];
    let testGroup1 = [[7/11],[-4/11]];
    let testGroup2 = [[7/11, 9/11, -10/11, 7/11],[-4/11, 10/11, -9/11, 1/11], [9/11, 9/11, 9/11, 9/11], [1/11, 1/11, 1/11, 1/11]];

    expect(splitAvgMinDistance(cToSeks)).toBeCloseTo(0.3311688);            // 1.214285714/11/(2/(6))
    expect(splitAvgMinDistance(testGroup1)).toBeCloseTo(0.5);               //11/11/(2/(1))
    expect(splitAvgMinDistance(testGroup2)).toBeCloseTo(0.38352272);        //2.8125/11/(2/(3))
});