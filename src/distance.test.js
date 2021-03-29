const {maxDistance} = require("./distance.js");
test("Test return values of max distance", () => {
    let testgroup1 = [[-11],[11]];
    let testgroup2 = [[-11],[-11]];
    let testgroup3 = [[11],[-11]];
    let testgroup4 = [[-11],[-11],[5],[7]];
    let testgroup5 = [[-11]];

    let testgroup6 = [[-11, 11],[-11,5],[5,2],[7,-7]];
    let testgroup7 = [[-11, 10, 7, 5],[-11, 2, -9, 3],[5, 6, 4, 2],[7, -7, -8, 5]];
    // let testgroup8 = [[-11],[-11],[5],[7]];
    // let testgroup9 = [[-11],[-11],[5],[7]];
    // let testgroup10 = [[-11],[-11],[5],[7]];
    // let testgroup11 = [[-11],[-11],[5],[7]];

    expect(maxDistance(testgroup1)).toEqual(22);
    expect(maxDistance(testgroup2)).toEqual(0);
    expect(maxDistance(testgroup3)).toEqual(22);
    expect(maxDistance(testgroup4)).toEqual(18);
    expect(maxDistance(testgroup5)).toEqual(0);

    expect(maxDistance(testgroup6)).toEqual(18);
    expect(maxDistance(testgroup7)).toEqual(13,5);
    // expect(maxDistance(testgroup8)).toEqual(22);
    // expect(maxDistance(testgroup9)).toEqual(18);
    // expect(maxDistance(testgroup10)).toEqual(0);
    // expect(maxDistance(testgroup11)).toEqual(22);
});

