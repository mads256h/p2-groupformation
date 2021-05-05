/**
 * @description The master algorithm
 * @module masterAlgorithm
 * @see module:masterAlgorithm
 * @author Mati-AAU and thom776g
 */

const {
    assertFunction,
    assertArraysOfArrayNotEmpty,
    assertArrayLengthEq,
    assertObject
} = require("../typeassert");

/**
 * @summary Calculates the overall score based on input subfunctions
 * @param {Function} heterogenousFunction function for calculating heterogenous score
 * @param {Function} homogenousFunction function for calculating homogenous score
 * @param {Function} subjectFunction function for calculating subject score
 * @param {number[][]} heterogenousCriteria criteria for calculating heterogenous score
 * @param {number[][]} homogenousCriteria criteria for calculating homogenous score
 * @param {number[][]} subjectCriteria criteria for calculating subject score
 * @param {object} weights object containing weights for algorithms
 * @returns {number} Calculated score for preferences
 */
function masterAlg(heterogenousFunction, homogenousFunction, subjectFunction, heterogenousCriteria, homogenousCriteria, subjectCriteria, weights){
    assertFunction(heterogenousFunction);
    assertFunction(homogenousFunction);
    assertFunction(subjectFunction);
    assertArraysOfArrayNotEmpty(heterogenousCriteria);
    assertArraysOfArrayNotEmpty(homogenousCriteria);
    assertArraysOfArrayNotEmpty(subjectCriteria);
    assertArrayLengthEq(...heterogenousCriteria);
    assertArrayLengthEq(...homogenousCriteria);
    assertArrayLengthEq(...subjectCriteria);
    assertObject(weights);
    // The algorithms needs to be normalized, so they can be weighted properly...
    return heterogenousFunction(heterogenousCriteria) * weights.heterogenous +
           homogenousFunction(homogenousCriteria) * weights.homogenous +
           subjectFunction(subjectCriteria) * weights.subjects;
}

module.exports = {masterAlg};