module.exports =
{
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
};


/**
 * @description Type- and rangeasserting module.
 * @module typeassert
 * @see module:typeassert
 * @author feybelle and mads256h
 */


/**
 * @private
 * @summary Valid typeof types
 */
const Type =
{
    "undefined": "undefined",
    "object": "object",
    "boolean": "boolean",
    "number": "number",
    "bigint": "bigint",
    "string": "string",
    "symbol": "symbol",
    "function": "function"
};


// General functions

/**
 * @summary Asserts that value is of type type
 * @param {any} value The value to assert the type of
 * @param {string} type The type
 * @throws {TypeError} If type is not a string or value is not of type type
 * @throws {RangeError} If type is not a valid type
 */
function assertType(value, type) {
    const validTypes =
        [
            Type.undefined,
            Type.object,
            Type.boolean,
            Type.number,
            Type.bigint,
            Type.string,
            Type.symbol,
            Type.function
        ];


    if (typeof type !== Type.string) {
        throw new TypeError("type is not a string");
    }

    if (!validTypes.some((v) => type === v)) {
        throw new RangeError("type is not specifying a valid type");
    }

    if (typeof value !== type) {
        throw new TypeError(`value is not of type ${type}`);
    }
}

/**
 * @summary Asserts that value is an instance of type
 * @param {any} value The value to assert that it is an instance of type
 * @param {Function} type The type to check value is an instance of
 * @throws {TypeError} value is not an instance of type or type is invalid
 */
function assertInstanceOf(value, type) {
    assertObject(value);

    if (type === undefined || type === null) {
        throw new TypeError("type is undefined or null");
    }

    assertType(type, Type.function);

    if (!type[Symbol.hasInstance](value)) {
        throw new TypeError(`value is not an instance of ${type}`);
    }
}


// Object

/**
 * @summary Asserts that value is an object
 * @param {any} value The value to assert that its an object
 * @throws {TypeError} If value is not an object
 */
function assertObject(value) {
    assertType(value, Type.object);
}


// Boolean

/**
 * @summary Asserts that value is a boolean
 * @param {any} value The value to assert that its a boolean
 * @throws {TypeError} If value is not a boolean
 */
function assertBoolean(value) {
    assertType(value, Type.boolean);
}


// Number

/**
 * @summary Asserts that value is a number
 * @param {any} value The value to assert that its a number
 * @throws {TypeError} If value is not a number
 */
function assertNumber(value) {
    assertType(value, Type.number);
}

/**
 * @summary Asserts that value is not NaN
 * @param {any} value The value to assert that it is not NaN
 * @throws {TypeError} If value is NaN or not of type number
 */
function assertNotNaN(value) {
    assertNumber(value);

    if (Number.isNaN(value)) {
        throw new TypeError("value is NaN");
    }
}

/**
 * @summary Asserts that value is an integer
 * @param {any} value The value to assert that its an integer
 * @throws {TypeError} If value is not an integer
 */
function assertInteger(value) {
    assertNumber(value);
    if (!Number.isInteger(value)) {
        throw new TypeError("value is not an integer");
    }
}

/**
 * @summary Asserts that value is less than max
 * @param {number} value The value to assert that it's less than max
 * @param {number} max The number value has to be less than
 * @throws {RangeError} If value is greater than or equal to max
 */
function assertLessThan(value, max) {
    assertNumber(value);
    assertNumber(max);

    assertNotNaN(value);
    assertNotNaN(max);

    if (value >= max) {
        throw new RangeError(`value is not less than ${max}`);
    }
}

/**
 * @summary Asserts that value is less than or equal to max
 * @param {number} value The value to assert that it's less than or equal to max
 * @param {number} max The number value has to be less than or equal to
 * @throws {RangeError} If value is greater than max
 */
function assertLessThanEq(value, max) {
    assertNumber(value);
    assertNumber(max);

    assertNotNaN(value);
    assertNotNaN(max);

    if (value > max) {
        throw new RangeError(`value is not less than or equal to ${max}`);
    }
}

/**
 * @summary Asserts that value is greater than min
 * @param {number} value The value to assert that it's greater than min
 * @param {number} min The number value has to be greater than
 * @throws {RangeError} If value is less than or equal to min
 */
function assertGreaterThan(value, min) {
    assertNumber(value);
    assertNumber(min);

    assertNotNaN(value);
    assertNotNaN(min);

    if (value <= min) {
        throw new RangeError(`value is not greater than ${min}`);
    }
}

/**
 * @summary Asserts that value is greater than or equal to min
 * @param {number} value The value to assert that it's greater than or equal to min
 * @param {number} min The number value has to be greater than or equal to
 * @throws {RangeError} If value is less than min
 */
function assertGreaterThanEq(value, min) {
    assertNumber(value);
    assertNumber(min);

    assertNotNaN(value);
    assertNotNaN(min);

    if (value < min) {
        throw new RangeError(`value is not greater than or equal to ${min}`);
    }
}

/**
 * @summary Asserts that the value is in the inclusive range denoted by min and max
 * @param {number} value The value to assert that it is in the range
 * @param {number} min The minimum value of the range
 * @param {number} max The maxumum value of the range
 * @throws {RangeError} If value is outside of the range
 */
function assertRangeInclusive(value, min, max) {
    assertNumber(max);
    assertNotNaN(max);

    assertGreaterThanEq(value, min);
    assertLessThanEq(value, max);
}

/**
 * @summary Asserts that the value is in the exclusive range denoted by min and max
 * @param {number} value The value to assert that it is in the range
 * @param {number} min The minimum value of the range
 * @param {number} max The maxumum value of the range
 * @throws {RangeError} If value is outside of the range
 */
function assertRangeExclusive(value, min, max) {
    assertNumber(max);
    assertNotNaN(max);

    assertGreaterThan(value, min);
    assertLessThan(value, max);
}


// String

/**
 * @summary Asserts that value is a string
 * @param {any} value The value to assert that it is a string
 * @throws {TypeError} If value is not a string
 */
function assertString(value) {
    assertType(value, Type.string);
}

/**
 * @summary Asserts that value is a non empty string
 * @param {any} value The value to assert that it is a non empty string
 * @throws {TypeError} If value is not a string
 * @throws {RangeError} If value is an empty string
 */
function assertStringNotEmpty(value) {
    assertString(value);

    if (value === "") {
        throw new RangeError("value is empty");
    }
}

// Array

/**
 * @summary Asserts that value is an array
 * @param {any} value The value to assert that it is an array
 * @throws {TypeError} If value is not an array
 */
function assertArray(value) {
    assertType(value, Type.object);

    if (!Array.isArray(value)) {
        throw new TypeError("value is not an array");
    }
}

/**
 * @summary Asserts that an array is not empty
 * @param {any} value The value to assert that it is not an empty array
 * @throws {RangeError} If value is empty
 */
function assertArrayNotEmpty(value) {
    assertArray(value);

    if (value.length === 0) {
        throw new RangeError("Array is empty");
    }
}

/**
 * @summary Asserts that any subarray in an array is not empty
 * @param {any} value The value to assert there is no empty subarrays
 * @throws {RangeError} If value is empty
 */
function assertArraysOfArrayNotEmpty(value) {
    assertArray(value);
    assertArrayItemsInstanceOf(value, Array);

    for (let a of value) {
        assertArrayNotEmpty(a);
    }
}


/**
 * @summary Asserts that all items of the array value is the type specified by type
 * @param {any} value The array to assert that each element is of type type
 * @param {string} type The type the array items should be
 * @throws {TypeError} If value is not an array or an element of value is not type type
 */
function assertArrayItemsType(value, type) {
    assertArray(value);

    for (let item of value) {
        assertType(item, type);
    }
}

/**
 * @summary Asserts that all items of the array value is an instance of type
 * @param {any} value The array to assert that each element is an instance of type
 * @param {Function} type The type the array items should be an instance of
 * @throws {TypeError} If value is not an array or an element of value is not an instance of type
 */
function assertArrayItemsInstanceOf(value, type) {
    assertArray(value);

    for (let item of value) {
        assertInstanceOf(item, type);
    }
}


/**
 * @summary Asserts that any subarray in an array does not have a differing amount of elements
 * @param {Array} first The first subarray is used to compare against the rest
 * @param {...Array} rest The rest of the subarrays
 * @throws {RangeError} If the arrays have differing lengths
 */
function assertArrayLengthEq(first, ...rest) {
    assertArray(first);
    assertArrayItemsInstanceOf(rest, Array);

    const length = first.length;

    for (let a of rest) {
        if (a.length !== length) {
            throw new RangeError("Array lengths not equal");
        }
    }
}

// Functions

/**
 * @summary Asserts that value is a function
 * @param {any} value The value to assert that its a function
 * @throws {TypeError} If value is not a function
 */
function assertFunction(value) {
    assertType(value, Type.function);
}
