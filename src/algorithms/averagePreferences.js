/**
 * @description The subject algorithm, used for matching common interest in subjects
 * @module masterAlgorithm
 * @see module:masterAlgorithm
 * @author Mati-AAU and CasperNS
 */
const { preferenceAlg } = require("./preference.js");
const { assertArraysOfArrayNotEmpty, assertArrayNotEmpty } = require("../typeassert");
const { transposeArray } = require("../math.js");

/**
 * @summary Calculates score for multiple preferences (using the preference algorithm)
 * @param {number[][]} preferencesArray preferences array. 0 is do not care, positive or negative is a preference for wanting the subject or not.
 * @returns {number} Calculated score for subjects
 */
function averagePreferenceAlg(preferencesArray) {
    assertArrayNotEmpty(preferencesArray);
    assertArraysOfArrayNotEmpty(preferencesArray);
    const transposed = transposeArray(preferencesArray);
    const result = transposed.reduce((acc, p) => acc + preferenceAlg(p), 0);
    console.log(result / transposed.length);
    return result / transposed.length;
}

module.exports = {averagePreferenceAlg};