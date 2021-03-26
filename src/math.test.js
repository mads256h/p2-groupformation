const {plus, euclidDistance} = require("./math.js");

test("adds 1 + 2 to equal 3", () => {
    expect(plus(1, 2)).toBe(3);
});

test("invalid types throw", () => {
    expect(() => plus("1", "hej")).toThrow(TypeError);
});

test("Euclidean distance throws", () => {
    expect(() => euclidDistance([0], [1,1])).toThrow(TypeError);
    expect(() => euclidDistance([], [])).toThrow(TypeError);
    expect(() => euclidDistance([], [2])).toThrow(TypeError);

});
test("Euclidean distance test values", () => {
    expect(euclidDistance([0,0], [1,1])).toEqual(Math.sqrt(2));
    expect(euclidDistance([-1,-1], [1,1])).toEqual(2*Math.sqrt(2));
    expect(euclidDistance([-1,0,0,0,0], [1,0,0,0,0])).toEqual(2);
});