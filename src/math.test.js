const plus = require('./math.js');

test("adds 1 + 2 to equal 3", () => {
  expect(plus(1, 2)).toBe(3);
});

test("invalid types throw", () => {
  expect(() => plus("1", "hej")).toThrow(TypeError);
});
