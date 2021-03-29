const {
    // General functions
    //assertType, // Add functions to this module instead of using this
    assertInstanceOf,

    // Object
    assertObject, // Probably should not be used

    // Boolean
    assertBoolean,

    // Number
    assertNumber,
    assertNotNaN,
    assertInteger,
    assertLessThan,
    assertLessThanEq,
    assertGreaterThan,
    assertGreaterThanEq,
    assertRangeInclusive,
    assertRangeExclusive,

    // String
    assertString,
    assertStringNotEmpty,

    // Array
    assertArray,
    assertArrayItemsType,
    assertArrayItemsInstanceOf
} = require("./typeassert");


test("assertInstanceOf: normal", () => {
    class Test {}
    class Test2 extends Test {}
    class Test3 extends Test2 {}
    expect(() => assertInstanceOf(new Test(), Test)).not.toThrow();
    expect(() => assertInstanceOf(new Test2(), Test2)).not.toThrow();
    expect(() => assertInstanceOf(new Test2(), Test)).not.toThrow();
    expect(() => assertInstanceOf(new Test3(), Test2)).not.toThrow();
    expect(() => assertInstanceOf(new Test3(), Test)).not.toThrow();
    expect(() => assertInstanceOf(new Test(), Test2)).toThrow(TypeError);
    expect(() => assertInstanceOf(new Test(), () => {})).toThrow(TypeError);
    expect(() => assertInstanceOf({}, Test)).toThrow(TypeError);
    expect(() => assertInstanceOf(null, Test)).toThrow(TypeError);
});

test("assertInstanceOf: invalid parameters", () => {
    class Test {}
    expect(() => assertInstanceOf({}, undefined)).toThrow(TypeError);
    expect(() => assertInstanceOf({}, null)).toThrow(TypeError);
    expect(() => assertInstanceOf({}, false)).toThrow(TypeError);
    expect(() => assertInstanceOf(1, Test)).toThrow(TypeError);
    expect(() => assertInstanceOf("test", Test)).toThrow(TypeError);
});


test("assertObject", () => {
    class Test {}
    expect(() => assertObject(new Test())).not.toThrow();
    expect(() => assertObject({})).not.toThrow();
    expect(() => assertObject([])).not.toThrow();
    expect(() => assertObject(null)).not.toThrow();

    expect(() => assertObject(undefined)).toThrow(TypeError);
    expect(() => assertObject(false)).toThrow(TypeError);
    expect(() => assertObject(1)).toThrow(TypeError);
    expect(() => assertObject("test")).toThrow(TypeError);
    expect(() => assertObject(() => {})).toThrow(TypeError);
});

test("assertBoolean", () => {
    expect(() => assertBoolean(false)).not.toThrow();
    expect(() => assertBoolean(true)).not.toThrow();

    expect(() => assertBoolean(undefined)).toThrow(TypeError);
    expect(() => assertBoolean(null)).toThrow(TypeError);
    expect(() => assertBoolean({})).toThrow(TypeError);
    expect(() => assertBoolean([])).toThrow(TypeError);
    expect(() => assertBoolean(1)).toThrow(TypeError);
    expect(() => assertBoolean("test")).toThrow(TypeError);
});

test("assertNumber", () => {
    expect(() => assertNumber(-1)).not.toThrow();
    expect(() => assertNumber(0)).not.toThrow();
    expect(() => assertNumber(1)).not.toThrow();
    expect(() => assertNumber(0.1)).not.toThrow();
    expect(() => assertNumber(NaN)).not.toThrow();
    expect(() => assertNumber(Infinity)).not.toThrow();
    expect(() => assertNumber(-Infinity)).not.toThrow();

    expect(() => assertNumber(undefined)).toThrow(TypeError);
    expect(() => assertNumber(null)).toThrow(TypeError);
    expect(() => assertNumber(false)).toThrow(TypeError);
    expect(() => assertNumber("test")).toThrow(TypeError);
    expect(() => assertNumber({})).toThrow(TypeError);
    expect(() => assertNumber([])).toThrow(TypeError);
});

test("assertNotNaN", () => {
    expect(() => assertNotNaN(-1)).not.toThrow();
    expect(() => assertNotNaN(0)).not.toThrow();
    expect(() => assertNotNaN(1)).not.toThrow();
    expect(() => assertNotNaN(0.1)).not.toThrow();
    expect(() => assertNotNaN(Infinity)).not.toThrow();
    expect(() => assertNotNaN(-Infinity)).not.toThrow();

    expect(() => assertNotNaN(NaN)).toThrow(TypeError);
    expect(() => assertNotNaN(undefined)).toThrow(TypeError);
    expect(() => assertNotNaN(null)).toThrow(TypeError);
    expect(() => assertNotNaN(false)).toThrow(TypeError);
    expect(() => assertNotNaN("test")).toThrow(TypeError);
    expect(() => assertNotNaN({})).toThrow(TypeError);
    expect(() => assertNotNaN([])).toThrow(TypeError);
});

test("assertInteger", () => {
    expect(() => assertInteger(-1)).not.toThrow();
    expect(() => assertInteger(0)).not.toThrow();
    expect(() => assertInteger(1)).not.toThrow();

    expect(() => assertInteger(0.1)).toThrow(TypeError);
    expect(() => assertInteger(NaN)).toThrow(TypeError);
    expect(() => assertInteger(Infinity)).toThrow(TypeError);
    expect(() => assertInteger(-Infinity)).toThrow(TypeError);
    expect(() => assertInteger(undefined)).toThrow(TypeError);
    expect(() => assertInteger(null)).toThrow(TypeError);
    expect(() => assertInteger(false)).toThrow(TypeError);
    expect(() => assertInteger("test")).toThrow(TypeError);
    expect(() => assertInteger({})).toThrow(TypeError);
    expect(() => assertInteger([])).toThrow(TypeError);
});

test("assertLessThan", () => {
    expect(() => assertLessThan(0, 1)).not.toThrow();
    expect(() => assertLessThan(-1, 0)).not.toThrow();
    expect(() => assertLessThan(-Infinity, 0)).not.toThrow();
    expect(() => assertLessThan(0.1, 1)).not.toThrow();

    expect(() => assertLessThan(0, 0)).toThrow(RangeError);
    expect(() => assertLessThan(1, 0)).toThrow(RangeError);
    expect(() => assertLessThan(0, -1)).toThrow(RangeError);
    expect(() => assertLessThan(Infinity, 0)).toThrow(RangeError);
    expect(() => assertLessThan(Infinity, -Infinity)).toThrow(RangeError);
    expect(() => assertLessThan(1, 0.1)).toThrow(RangeError);

    expect(() => assertLessThan(0, undefined)).toThrow(TypeError);
    expect(() => assertLessThan(0, null)).toThrow(TypeError);
    expect(() => assertLessThan(0, false)).toThrow(TypeError);
    expect(() => assertLessThan(0, "test")).toThrow(TypeError);
    expect(() => assertLessThan(0, {})).toThrow(TypeError);
    expect(() => assertLessThan(0, [])).toThrow(TypeError);
    expect(() => assertLessThan(0, NaN)).toThrow(TypeError);
    expect(() => assertLessThan(undefined, 0)).toThrow(TypeError);
    expect(() => assertLessThan(null, 0)).toThrow(TypeError);
    expect(() => assertLessThan(false, 0)).toThrow(TypeError);
    expect(() => assertLessThan("test", 0)).toThrow(TypeError);
    expect(() => assertLessThan({}, 0)).toThrow(TypeError);
    expect(() => assertLessThan([], 0)).toThrow(TypeError);
    expect(() => assertLessThan(NaN, 0)).toThrow(TypeError);
});
