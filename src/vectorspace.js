const euclidDistance = require("./math.js");

/**
 * @summary Measures distribution of vectors in vectorspace
 * @param {number[][]} criteria 2d array with students and their criterias
 * @returns {number} the calculated score
 */
function vectorSpace(criteria){
    let score = 0;
    for (let criteria1 = 0; criteria.length; criteria1++) {
        let minDist = Infinity;
        for (let criteria2 = 0; criteria2 < criteria.length; criteria2++) {
            if (criteria1 !== criteria2){
                minDist = Math.min(
                    minDist, euclidDistance(criteria[criteria1], criteria[criteria2]));
            }
        }
        score += minDist;
    }
    return score;
}
