/**
 * @description The master algorithm
 * @module masterAlgorithm
 * @see module:masterAlgorithm
 * @author Mati-AAU and thom776g
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