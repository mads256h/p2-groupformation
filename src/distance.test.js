const {maxDistance} = require("./distance.js");
test("return values of max distance", () => {
    let cToSeks = [[9, 7, 9, 3],[5, -3, 1, -5],[1, 5, 5, -3],[-5, -7, 3, -9],[7, -7, 11, -9],[1, 5, 5, -7],[9, 5, 5, -3]];
    let testgroup1 = [[-11], [11]];
    let testgroup2 = [[-11], [-11]];
    let testgroup3 = [[11], [-11]];
    let testgroup4 = [[-11], [-11], [5], [7]];
    let testgroup5 = [[-11]];

    let testgroup6 = [[-11, 11], [-11, 5], [5, 2], [7, -7]];
    let testgroup7 = [[-11, 10, 7, 5], [-11, 2, -9, 3], [5, 6, 4, 2], [7, -7, -8, 5]];


    expect(maxDistance(cToSeks)).toEqual(12.5);
    expect(maxDistance(testgroup1)).toEqual(22);
    expect(maxDistance(testgroup2)).toEqual(0);
    expect(maxDistance(testgroup3)).toEqual(22);
    expect(maxDistance(testgroup4)).toEqual(18);
    expect(maxDistance(testgroup5)).toEqual(0);

    expect(maxDistance(testgroup6)).toEqual(18);
    expect(maxDistance(testgroup7)).toEqual(13.5);
});