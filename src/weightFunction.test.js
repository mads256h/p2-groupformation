const {sigmoid0to2} = require("./weightFunction.js");

test("Average vector distance throws", () => {
    expect(sigmoid0to2(0)).toBeCloseTo(0.01);
    expect(sigmoid0to2(0.48)).toBeCloseTo(0.07);
    expect(sigmoid0to2(1)).toBeCloseTo(0.5);
    expect(sigmoid0to2(1.46)).toBeCloseTo(0.91);
    expect(sigmoid0to2(2)).toBeCloseTo(0.99);
    expect(sigmoid0to2(100)).toBeCloseTo(1);
    expect(sigmoid0to2(-100)).toBeCloseTo(0);
});