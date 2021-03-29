module.exports = {averageVectorMinDistance, averageVectorDistance};

const {inputCheck} = require("./inputCheck.js");
const {lpDistance} = require("./math.js");

/**
 * @summary Measures distribution of vectors in vectorspace by summing minimum distances
 * @param {number[][]} criteria 2d array with students and their criterias
 * @param {number} p p value for lpdistance function
 * @returns {number} the calculated score
 */
function averageVectorMinDistance(criteria, p){
    inputCheck(criteria);
    let score = 0;
    for (let criteria1 = 0; criteria.length; criteria1++) {
        let minDist = Infinity;
        for (let criteria2 = 0; criteria2 < criteria.length; criteria2++) {
            if (criteria1 !== criteria2){
                minDist = Math.min(
                    minDist, lpDistance(criteria[criteria1], criteria[criteria2], p));
            }
        }
        score += minDist;
    }
    return score;
}

/**
 * @summary Calculates average Lp distance between all vectors
 * @param {number[][]} criteria 2d array with students and their criterias
 * @param {number} p p value for lpdistance function
 * @returns {number} the calculated score
 */
function averageVectorDistance(criteria, p){
    inputCheck(criteria);
    let score = 0;
    let totalDistances = 0;
    for (let criteria1 = 0; criteria1 < criteria.length; criteria1++) {
        let distanceSum = 0;
        for (let criteria2 = 0; criteria2 < criteria.length; criteria2++) {
            if (criteria1 !== criteria2){
                distanceSum += lpDistance(criteria[criteria1], criteria[criteria2], p);
                totalDistances++;
            }
        }
        score += distanceSum;
    }
    return score / totalDistances;

}