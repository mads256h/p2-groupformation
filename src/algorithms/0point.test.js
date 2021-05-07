const {balance} = require("./0point.js");
test("return values of the 0point algorithm", () => {
    const testgroup = [[-11], [11]];
    expect(balance(testgroup)).toEqual(-0);
});

test("return values of the 0point algorithm with multiple criteria", () => {
    const testgroup = [[-11, 3, -4, 2], [11, -3, 5, -1]];
    expect(balance(testgroup)).toEqual(-2);
});

test("return values of the 0point algorithm with more students", () => {
    const testgroup = [[-11, 3], [11, -3], [4, 6], [2, 8], [-6, -8]];
    expect(balance(testgroup)).toEqual(-6);
});