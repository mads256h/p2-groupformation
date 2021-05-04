/**
 * @description The master algorithm
 * @module masterAlgorithm
 * @see module:masterAlgorithm
 * @author Mati-AAU and thom776g
 */

module.exports = {masterAlg};
const {
    assertFunction
} = require("../typeassert");

/**
 * @summary Calculates the overall score based on input subfunctions
 * @param {Function} heterogenousFunction function for calculating heterogenous score
 * @param {Function} homogenousFunction function for calculating homogenous score
 * @param {Function} subjectFunction function for calculating subject score
 * @param {number[][]} heterogenousCriteria criteria for calculating heterogenous score
 * @param {number[][]} homogenousCriteria criteria for calculating homogenous score
 * @param {number[][]} subjectCriteria criteria for calculating subject score
 * @returns {number} Calculated score for preferences
 */
function masterAlg(heterogenousFunction, homogenousFunction, subjectFunction, heterogenousCriteria, homogenousCriteria, subjectCriteria){
    assertFunction(heterogenousFunction);
    assertFunction(homogenousFunction);
    assertFunction(subjectFunction);
    // The algorithms needs to be normalized, so they can be weighted properly...
    return heterogenousFunction(heterogenousCriteria) + homogenousFunction(homogenousCriteria) + subjectFunction(subjectCriteria);
}