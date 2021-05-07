/**
 * @description 0 points algorithm
 * @module 0point
 * @see module:0point
 * @author Mati-AAU and thom776g
 */

const {
    assertArray,
    assertArrayItemsInstanceOf,
    assertArrayLengthEq,
    assertArraysOfArrayNotEmpty,
    assertArrayNotEmpty
} = require("../typeassert");

const {transposeArray} = require("../math.js");

/**
 * @summary Measures the balance of criterias in a group
 * @param {number[][]} criteria 2d array with students and their criterias
 * @returns {number} the calculated score
 */
function balance(criteria){
    assertArray(criteria);
    assertArrayNotEmpty(criteria);
    assertArrayItemsInstanceOf(criteria, Array);
    assertArraysOfArrayNotEmpty(criteria);
    assertArrayLengthEq(...criteria);


    return (-transposeArray(criteria)
        // Summate the criteria
        .reduce((a, b) => a + Math.abs(b.reduce((c, d) => c + d)), 0));
}

module.exports = {balance};