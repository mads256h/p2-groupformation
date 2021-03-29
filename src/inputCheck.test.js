const {inputCheck} = require("./inputCheck.js");

test("correct input of the array", () => {
    let testgroup = [[-11],[11]];
    expect(() => inputCheck(testgroup)).not.toThrow(Error);
});

test("wrong input of the array, with empty array", () => {
    let testgroup = [];
    expect(() => inputCheck(testgroup)).toThrow(Error);
});

test("wrong input of the array, with empty criteria", () => {
    let testgroup = [[], [], []];
    expect(() => inputCheck(testgroup)).toThrow(Error);
});

test("wrong input of the array, with not the same number of criteria", () => {
    let testgroup = [[11, 3, -6, 8], [-4, 6, 8, -5], [7, -9, 8], [9, 7, -11, 7]];
    expect(() => inputCheck(testgroup)).toThrow(Error);
});