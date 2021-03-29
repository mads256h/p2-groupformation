const {maxDistance} = require("./distance.js");
test("Test return values of max distance", () => {
    let testgroup = [[-11],[11]];
    expect(maxDistance(testgroup)).toEqual(22);
});

