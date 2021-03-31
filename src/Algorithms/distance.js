/**
 * @description The distance algorithm.
 * @module distance
 * @see module:distance
 * @author Mati-AAU and thom776g
 */

module.exports = {maxDistance};
const {
    assertArray,
    assertArrayItemsInstanceOf,
    assertArrayLengthEq,
    assertArraysOfArrayNotEmpty,
    assertArrayNotEmpty
} = require("../typeassert");
const {transposeArray} = require("../math.js");

/**
 * @summary Measures the max distance between all criterias.
 * @param {number[][]} criteria 2d array with students and their criterias
 * @returns {number} the calculated score
 */
function maxDistance(criteria){
    assertArray(criteria);
    assertArrayNotEmpty(criteria);
    assertArrayItemsInstanceOf(criteria, Array);
    assertArraysOfArrayNotEmpty(criteria);
    assertArrayLengthEq(...criteria);
    const transposedCriteria = transposeArray(criteria);
    let value = 0;
    for (let i = 0; i < transposedCriteria.length; i++){
        const min = Math.min(...transposedCriteria[i]);
        const max = Math.max(...transposedCriteria[i]);
        value += max - min;
    }
    return value / transposedCriteria.length;
}
