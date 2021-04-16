/**
 * @description The master algorithm
 * @module masterAlgorithm
 * @see module:masterAlgorithm
 * @author Mati-AAU and thom776g
 */

 module.exports = {preferenceAlg};
 const {
  assertArrayItemsType,
  assertArrayNotEmpty
} = require("../typeassert");


function preferenceAlg(preferences){
    assertArrayNotEmpty(preferences);
    assertArrayItemsType(preferences, "number");
    let fromHome = 0, inOffice = 0;
    for (const preference of preferences) {
        if(preference < -Number.EPSILON){
            fromHome++;
        }
        if(preference > Number.EPSILON){
            inOffice++;
        }
    }
    let min = Math.min(fromHome, inOffice)
    let max = Math.max(fromHome, inOffice)
    
    return -(min/max);
}