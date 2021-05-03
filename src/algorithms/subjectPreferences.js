/**
 * @description The subject algorithm, used for matching common interest in subjects
 * @module masterAlgorithm
 * @see module:masterAlgorithm
 * @author Mati-AAU and CasperNS
 */
const { preferenceAlg } = require("./preference.js");
const { assertArray } = require("../typeassert");
module.exports = {subjectAlg};

/**
 * @summary Calculates score for subjects (using the preference algorithm)
 * @param {number[][]} subjects subject array. 0 is do not care, positive or negative is a preference for wanting the subject or not.
 * @returns {number} Calculated score for subjects
 */
function subjectAlg(subjects) {
    assertArray(subjects);
    let result = 0;
    for (const subject of subjects) {
        result += preferenceAlg(subject);
    }
    return result / subjects.length;
}