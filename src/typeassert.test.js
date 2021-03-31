const {
    // General functions
    // assertType, // Add functions to this module instead of using this
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
    assertArrayItemsInstanceOf,
    assertArrayLengthEq,
    assertArraysOfArrayNotEmpty,
    assertArrayNotEmpty,

    // Function
    assertFunction
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

test("assertLessThanEq", () => {
    expect(() => assertLessThanEq(0, 1)).not.toThrow();
    expect(() => assertLessThanEq(-1, 0)).not.toThrow();
    expect(() => assertLessThanEq(-Infinity, 0)).not.toThrow();
    expect(() => assertLessThanEq(0.1, 1)).not.toThrow();
    expect(() => assertLessThanEq(0, 0)).not.toThrow();

    expect(() => assertLessThanEq(1, 0)).toThrow(RangeError);
    expect(() => assertLessThanEq(0, -1)).toThrow(RangeError);
    expect(() => assertLessThanEq(Infinity, 0)).toThrow(RangeError);
    expect(() => assertLessThanEq(Infinity, -Infinity)).toThrow(RangeError);
    expect(() => assertLessThanEq(1, 0.1)).toThrow(RangeError);

    expect(() => assertLessThanEq(0, undefined)).toThrow(TypeError);
    expect(() => assertLessThanEq(0, null)).toThrow(TypeError);
    expect(() => assertLessThanEq(0, false)).toThrow(TypeError);
    expect(() => assertLessThanEq(0, "test")).toThrow(TypeError);
    expect(() => assertLessThanEq(0, {})).toThrow(TypeError);
    expect(() => assertLessThanEq(0, [])).toThrow(TypeError);
    expect(() => assertLessThanEq(0, NaN)).toThrow(TypeError);
    expect(() => assertLessThanEq(undefined, 0)).toThrow(TypeError);
    expect(() => assertLessThanEq(null, 0)).toThrow(TypeError);
    expect(() => assertLessThanEq(false, 0)).toThrow(TypeError);
    expect(() => assertLessThanEq("test", 0)).toThrow(TypeError);
    expect(() => assertLessThanEq({}, 0)).toThrow(TypeError);
    expect(() => assertLessThanEq([], 0)).toThrow(TypeError);
    expect(() => assertLessThanEq(NaN, 0)).toThrow(TypeError);
});

test("assertGreaterThan", () => {
    expect(() => assertGreaterThan(1, 0)).not.toThrow();
    expect(() => assertGreaterThan(0, -1)).not.toThrow();
    expect(() => assertGreaterThan(0, -Infinity)).not.toThrow();
    expect(() => assertGreaterThan(1, 0.1)).not.toThrow();

    expect(() => assertGreaterThan(0, 0)).toThrow(RangeError);
    expect(() => assertGreaterThan(0, 1)).toThrow(RangeError);
    expect(() => assertGreaterThan(-1, 0)).toThrow(RangeError);
    expect(() => assertGreaterThan(0, Infinity)).toThrow(RangeError);
    expect(() => assertGreaterThan(-Infinity, Infinity)).toThrow(RangeError);
    expect(() => assertGreaterThan(0.1, 1)).toThrow(RangeError);

    expect(() => assertGreaterThan(0, undefined)).toThrow(TypeError);
    expect(() => assertGreaterThan(0, null)).toThrow(TypeError);
    expect(() => assertGreaterThan(0, false)).toThrow(TypeError);
    expect(() => assertGreaterThan(0, "test")).toThrow(TypeError);
    expect(() => assertGreaterThan(0, {})).toThrow(TypeError);
    expect(() => assertGreaterThan(0, [])).toThrow(TypeError);
    expect(() => assertGreaterThan(0, NaN)).toThrow(TypeError);
    expect(() => assertGreaterThan(undefined, 0)).toThrow(TypeError);
    expect(() => assertGreaterThan(null, 0)).toThrow(TypeError);
    expect(() => assertGreaterThan(false, 0)).toThrow(TypeError);
    expect(() => assertGreaterThan("test", 0)).toThrow(TypeError);
    expect(() => assertGreaterThan({}, 0)).toThrow(TypeError);
    expect(() => assertGreaterThan([], 0)).toThrow(TypeError);
    expect(() => assertGreaterThan(NaN, 0)).toThrow(TypeError);
});

test("assertGreaterThanEq", () => {
    expect(() => assertGreaterThanEq(1, 0)).not.toThrow();
    expect(() => assertGreaterThanEq(0, -1)).not.toThrow();
    expect(() => assertGreaterThanEq(0, -Infinity)).not.toThrow();
    expect(() => assertGreaterThanEq(1, 0.1)).not.toThrow();
    expect(() => assertGreaterThanEq(0, 0)).not.toThrow();

    expect(() => assertGreaterThanEq(0, 1)).toThrow(RangeError);
    expect(() => assertGreaterThanEq(-1, 0)).toThrow(RangeError);
    expect(() => assertGreaterThanEq(0, Infinity)).toThrow(RangeError);
    expect(() => assertGreaterThanEq(-Infinity, Infinity)).toThrow(RangeError);
    expect(() => assertGreaterThanEq(0.1, 1)).toThrow(RangeError);

    expect(() => assertGreaterThanEq(0, undefined)).toThrow(TypeError);
    expect(() => assertGreaterThanEq(0, null)).toThrow(TypeError);
    expect(() => assertGreaterThanEq(0, false)).toThrow(TypeError);
    expect(() => assertGreaterThanEq(0, "test")).toThrow(TypeError);
    expect(() => assertGreaterThanEq(0, {})).toThrow(TypeError);
    expect(() => assertGreaterThanEq(0, [])).toThrow(TypeError);
    expect(() => assertGreaterThanEq(0, NaN)).toThrow(TypeError);
    expect(() => assertGreaterThanEq(undefined, 0)).toThrow(TypeError);
    expect(() => assertGreaterThanEq(null, 0)).toThrow(TypeError);
    expect(() => assertGreaterThanEq(false, 0)).toThrow(TypeError);
    expect(() => assertGreaterThanEq("test", 0)).toThrow(TypeError);
    expect(() => assertGreaterThanEq({}, 0)).toThrow(TypeError);
    expect(() => assertGreaterThanEq([], 0)).toThrow(TypeError);
    expect(() => assertGreaterThanEq(NaN, 0)).toThrow(TypeError);
});

test("assertRangeInclusive", () => {
    expect(() => assertRangeInclusive(1, 0, 2)).not.toThrow();
    expect(() => assertRangeInclusive(-2, -3, -1)).not.toThrow();
    expect(() => assertRangeInclusive(0, -Infinity, Infinity)).not.toThrow();
    expect(() => assertRangeInclusive(0, -0.1, 0.1)).not.toThrow();
    expect(() => assertRangeInclusive(0, 0, 0)).not.toThrow();
    expect(() => assertRangeInclusive(2, 0, 2)).not.toThrow();
    expect(() => assertRangeInclusive(0, 0, 2)).not.toThrow();

    expect(() => assertRangeInclusive(3, 0, 2)).toThrow(RangeError);
    expect(() => assertRangeInclusive(-4, -3, -1)).toThrow(RangeError);
    expect(() => assertRangeInclusive(-Infinity, 0, Infinity)).toThrow(RangeError);
    expect(() => assertRangeInclusive(-0.2, -0.1, 0.1)).toThrow(RangeError);

    expect(() => assertRangeInclusive(0, 0, undefined)).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, 0, null)).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, 0, false)).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, 0, "test")).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, 0, {})).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, 0, [])).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, 0, NaN)).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, undefined, 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, null, 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, false, 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, "test", 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, {}, 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, [], 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive(0, NaN, 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive(undefined, 0, 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive(null, 0, 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive(false, 0, 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive("test", 0, 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive({}, 0, 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive([], 0, 0)).toThrow(TypeError);
    expect(() => assertRangeInclusive(NaN, 0, 0)).toThrow(TypeError);
});

test("assertRangeExclusive", () => {
    expect(() => assertRangeExclusive(1, 0, 2)).not.toThrow();
    expect(() => assertRangeExclusive(-2, -3, -1)).not.toThrow();
    expect(() => assertRangeExclusive(0, -Infinity, Infinity)).not.toThrow();
    expect(() => assertRangeExclusive(0, -0.1, 0.1)).not.toThrow();

    expect(() => assertRangeExclusive(0, 0, 0)).toThrow(RangeError);
    expect(() => assertRangeExclusive(2, 0, 2)).toThrow(RangeError);
    expect(() => assertRangeExclusive(0, 0, 2)).toThrow(RangeError);
    expect(() => assertRangeExclusive(3, 0, 2)).toThrow(RangeError);
    expect(() => assertRangeExclusive(-4, -3, -1)).toThrow(RangeError);
    expect(() => assertRangeExclusive(-Infinity, 0, Infinity)).toThrow(RangeError);
    expect(() => assertRangeExclusive(-0.2, -0.1, 0.1)).toThrow(RangeError);

    expect(() => assertRangeExclusive(0, 0, undefined)).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, 0, null)).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, 0, false)).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, 0, "test")).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, 0, {})).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, 0, [])).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, 0, NaN)).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, undefined, 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, null, 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, false, 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, "test", 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, {}, 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, [], 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive(0, NaN, 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive(undefined, 0, 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive(null, 0, 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive(false, 0, 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive("test", 0, 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive({}, 0, 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive([], 0, 0)).toThrow(TypeError);
    expect(() => assertRangeExclusive(NaN, 0, 0)).toThrow(TypeError);
});

test("assertString", () => {
    class Test {}
    expect(() => assertString("test")).not.toThrow();
    expect(() => assertString("")).not.toThrow();
    expect(() => assertString("1")).not.toThrow();

    expect(() => assertString(new Test())).toThrow(TypeError);
    expect(() => assertString({})).toThrow(TypeError);
    expect(() => assertString([])).toThrow(TypeError);
    expect(() => assertString(null)).toThrow(TypeError);
    expect(() => assertString(undefined)).toThrow(TypeError);
    expect(() => assertString(false)).toThrow(TypeError);
    expect(() => assertString(1)).toThrow(TypeError);
    expect(() => assertString(() => {})).toThrow(TypeError);
});

test("assertStringNotEmpty", () => {
    class Test {}
    expect(() => assertStringNotEmpty("test")).not.toThrow();
    expect(() => assertStringNotEmpty("1")).not.toThrow();

    expect(() => assertStringNotEmpty("")).toThrow(RangeError);

    expect(() => assertStringNotEmpty(new Test())).toThrow(TypeError);
    expect(() => assertStringNotEmpty({})).toThrow(TypeError);
    expect(() => assertStringNotEmpty([])).toThrow(TypeError);
    expect(() => assertStringNotEmpty(null)).toThrow(TypeError);
    expect(() => assertStringNotEmpty(undefined)).toThrow(TypeError);
    expect(() => assertStringNotEmpty(false)).toThrow(TypeError);
    expect(() => assertStringNotEmpty(1)).toThrow(TypeError);
    expect(() => assertStringNotEmpty(() => {})).toThrow(TypeError);
});

test("assertArray", () => {
    class Test {}
    expect(() => assertArray([])).not.toThrow();
    expect(() => assertArray([1, 2, 3, 4])).not.toThrow();
    expect(() => assertArray([1, 2, "3", 4])).not.toThrow();
    expect(() => assertArray(new Array())).not.toThrow();

    expect(() => assertArray(new Test())).toThrow(TypeError);
    expect(() => assertArray({})).toThrow(TypeError);
    expect(() => assertArray(null)).toThrow(TypeError);
    expect(() => assertArray(undefined)).toThrow(TypeError);
    expect(() => assertArray(false)).toThrow(TypeError);
    expect(() => assertArray(1)).toThrow(TypeError);
    expect(() => assertArray("test")).toThrow(TypeError);
    expect(() => assertArray(() => {})).toThrow(TypeError);
});

test("assertArrayItemsType", () => {
    class Test {}
    expect(() => assertArrayItemsType([], "string")).not.toThrow();
    expect(() => assertArrayItemsType([1, 2, 3, 4], "number")).not.toThrow();
    expect(() => assertArrayItemsType(new Array(), "object")).not.toThrow();

    expect(() => assertArrayItemsType([1, 2, "3", 4], "number")).toThrow(TypeError);

    expect(() => assertArrayItemsType(new Test(), undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsType({}, undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsType(null, undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsType(undefined, undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsType(false, undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsType(1, undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsType("test", undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsType(() => {}, undefined)).toThrow(TypeError);
});

test("assertArrayItemsInstanceOf", () => {
    class Test {}
    class Test2 extends Test{}
    class Test3 extends Test2{}

    expect(() => assertArrayItemsInstanceOf([new Test()], Test)).not.toThrow();
    expect(() => assertArrayItemsInstanceOf([new Test(), new Test2()], Test)).not.toThrow();
    expect(() => assertArrayItemsInstanceOf([new Test(), new Test2(), new Test3()], Test)).not.toThrow();
    expect(() => assertArrayItemsInstanceOf([new Test2(), new Test3()], Test2)).not.toThrow();

    expect(() => assertArrayItemsInstanceOf([new Test()], Test2)).toThrow(TypeError);
    expect(() => assertArrayItemsInstanceOf([new Test(), new Test2()], Test2)).toThrow(TypeError);
    expect(() => assertArrayItemsInstanceOf([new Test(), new Test2(), new Test3()], Test2)).toThrow(TypeError);
    expect(() => assertArrayItemsInstanceOf([new Test2(), new Test3()], Test3)).toThrow(TypeError);

    expect(() => assertArrayItemsInstanceOf(new Test(), undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsInstanceOf({}, undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsInstanceOf(null, undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsInstanceOf(undefined, undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsInstanceOf(false, undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsInstanceOf(1, undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsInstanceOf("test", undefined)).toThrow(TypeError);
    expect(() => assertArrayItemsInstanceOf(() => {}, undefined)).toThrow(TypeError);
});


test("assertArrayNotEmpty", () => {
    expect(() => assertArrayNotEmpty([-11, 11])).not.toThrow();
    expect(() => assertArrayNotEmpty([[-11], [11]])).not.toThrow();
    expect(() => assertArrayNotEmpty([[], []])).not.toThrow();
    expect(() => assertArrayNotEmpty([])).toThrow(RangeError);
});

test("assertArraysOfArrayNotEmpty", () => {
    expect(() => assertArraysOfArrayNotEmpty([[-11], [11]])).not.toThrow();
    expect(() => assertArraysOfArrayNotEmpty([])).not.toThrow();
    expect(() => assertArraysOfArrayNotEmpty([-11, 11])).toThrow(TypeError);
    expect(() => assertArraysOfArrayNotEmpty([[-11], []])).toThrow(RangeError);
    expect(() => assertArraysOfArrayNotEmpty([[], []])).toThrow(RangeError);
});

test("assertArrayLengthEq", () => {
    expect(() => assertArrayLengthEq([-11, 11])).not.toThrow();
    expect(() => assertArrayLengthEq(...[[-11], [11]])).not.toThrow();
    expect(() => assertArrayLengthEq([])).not.toThrow();
    expect(() => assertArrayLengthEq(...[[], []])).not.toThrow();
    expect(() => assertArrayLengthEq(...[[-11, 5], [3]])).toThrow(RangeError);
});

// Function

test("assertFunction", () => {
    expect(() => assertFunction(assertFunction)).not.toThrow();
    expect(() => assertFunction((a)=>a)).not.toThrow();

    expect(() => assertFunction(undefined)).toThrow(TypeError);
    expect(() => assertFunction(1)).toThrow(TypeError);
    expect(() => assertFunction(null)).toThrow(TypeError);
    expect(() => assertFunction(false)).toThrow(TypeError);
    expect(() => assertFunction("test")).toThrow(TypeError);
    expect(() => assertFunction({})).toThrow(TypeError);
    expect(() => assertFunction([])).toThrow(TypeError);
});