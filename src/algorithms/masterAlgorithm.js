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

const{averageVectorDistance} = require("./vectorspace.js");
const{constant} = require("./weightFunction.js");

/**
 * @summary Calculates score for preferences (i.e. working from home)
 * @param {Number[]} preferences preference array. 0 is do not care, positive or negative is a preference. 
 * @returns Calculated score for preferences
 */
function prefrenceAlg(preferences){
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

function subjectAlg(){

}

function masterAlg(heterogenous, homogenous, subject){
    let score = 0;
    
    score += averageVectorDistance(heterogenous, 0.5, constant);
    score += preferenceAlg(homogenous);
    score += subjectAlg(subject);

    return score;
}