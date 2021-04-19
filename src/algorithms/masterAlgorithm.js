/**
 * @description The master algorithm
 * @module masterAlgorithm
 * @see module:masterAlgorithm
 * @author Mati-AAU and thom776g
 */

module.exports = {preferenceAlg, masterAlg};
const {
    assertArrayItemsType,
    assertArrayNotEmpty,
    assertFunction
} = require("../typeassert");

/**
 * @summary Calculates score for preferences (i.e. working from home)
 * @param {number[]} preferences preference array. 0 is do not care, positive or negative is a preference.
 * @returns {number} Calculated score for preferences
 */
function preferenceAlg(preferences){
    assertArrayNotEmpty(preferences);
    assertArrayItemsType(preferences, "number");
    let fromHome = 0, inOffice = 0;
    for (const preference of preferences) {
        if (preference < -Number.EPSILON){
            fromHome++;
        }
        if (preference > Number.EPSILON){
            inOffice++;
        }
    }
    let min = Math.min(fromHome, inOffice);
    let max = Math.max(fromHome, inOffice);
    return -(min / max);
}

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