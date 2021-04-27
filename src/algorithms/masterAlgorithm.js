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
 * @param {Function} heterogenousFunction Parameterless function for calculating heterogenous score
 * @param {Function} homogenousFunction Parameterless function for calculating homogenous score
 * @param {Function} subjectFunction Parameterless function for calculating subject score
 * @returns {number} Calculated score for preferences
 */
function masterAlg(heterogenousFunction, homogenousFunction, subjectFunction){
    assertFunction(heterogenousFunction);
    assertFunction(homogenousFunction);
    assertFunction(subjectFunction);
    return heterogenousFunction() + homogenousFunction() + subjectFunction();
}