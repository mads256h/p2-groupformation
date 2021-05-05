/**
 * @description The preference algorithm, used for matching preferences such as working from home
 * @module masterAlgorithm
 * @see module:masterAlgorithm
 * @author Mati-AAU and thom776g
 */

const {
    assertArrayItemsType,
    assertArrayNotEmpty,
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
    const min = Math.min(fromHome, inOffice);
    const max = Math.max(fromHome, inOffice);
    if (max === 0){
        return 0;
    }
    else {
        return -(min / max);
    }
}

module.exports = {preferenceAlg};