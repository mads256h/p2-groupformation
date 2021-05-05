/**
 * @description Math helper functions.
 * @module math
 * @see module:math
 * @author Mati-AAU and thom776g and mads256h
 */

module.exports = {euclidDistance, lpDistance, transposeArray, removeItemFromArray, mapRange};

const {
    assertArray,
    assertArrayLengthEq,
    assertArrayNotEmpty,
    assertGreaterThan,
    assertArrayItemsType,

    assertNumber,
    assertLessThanEq,
    assertRangeInclusive
} = require("./typeassert");

/**
 * @summary Measures the euclid distance between point1 and point2
 * @param {number[]} point1 n dimensional point in space
 * @param {number[]} point2 n dimensional point in space
 * @returns {number} the calculated euclid distance
 * @throws {TypeError} Throws when dimensions dont match
 */
function euclidDistance(point1, point2) {
    return lpDistance(point1, point2, 2);
}

/**
 * @summary Measures the Lp norm distance between point1 and point2
 * @param {number[]} point1 n dimensional point in space
 * @param {number[]} point2 n dimensional point in space
 * @param {number} p The p in Lp norm. p=2 is euclid, p=1 is manhattan, etc.
 * @returns {number} the calculated Lp distance
 * @throws {TypeError} Throws when dimensions dont match or less than 1 dimensions
 * @throws {RangeError} Throws when p=0
 */
function lpDistance(point1, point2, p) {
    assertArrayNotEmpty(point1);
    assertArrayLengthEq(point1, point2);
    assertGreaterThan(p, 0);
    assertArrayItemsType(point1, "number");
    assertArrayItemsType(point2, "number");

    let innerSum = 0;
    for (let i = 0; i < point1.length; i++) {
        innerSum += Math.pow(Math.abs(point1[i] - point2[i]), p);
    }
    return Math.pow(innerSum, 1 / p);
}

/**
 * @summary Transposes a 2D array
 * @param {any[][]} array The 2D array to transpose
 * @returns {any[][]} The transposed array
 * @throws {TypeError} array is not a 2D array
 * @throws {RangeError} array is a staggered array
 */
function transposeArray(array) {
    assertArray(array);
    assertArrayLengthEq(...array);

    return array[0].map((_, i) => array.map(x => x[i]));
}

/**
 * @summary Remove item from array
 * @param {any} item The item to remove
 * @param {any[]} array The array to remove the item from
 * @returns {any[]} The array
 * @throws {TypeError} The array's items is not the same type as item
 */
function removeItemFromArray(item, array) {
    assertArray(array);
    assertArrayItemsType(array, typeof item);

    array.splice(array.indexOf(item), 1);

    return array;
}


/**
 * @summary Maps a value from a range to another range
 * @param {number} value The value to map to another range
 * @param {number} inMin The minimum value of the starting range
 * @param {number} inMax The maximum value of the starting range
 * @param {number} outMin The minimum value of the resulting range
 * @param {number} outMax The maximum value of the resulting range
 * @returns {number} Value mapped from the starting range to the resulting range
 */
function mapRange(value, inMin, inMax, outMin, outMax) {
    assertNumber(value);
    assertNumber(inMin);
    assertNumber(inMax);
    assertNumber(outMin);
    assertNumber(outMax);

    assertRangeInclusive(value, inMin, inMax);

    assertLessThanEq(inMin, inMax);
    assertLessThanEq(outMin, outMax);

    const result = outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
    return Number.isNaN(result) ? 0 : result;
}
