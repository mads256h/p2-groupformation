/*  
    Algorithms for judging vectors
        based on heterogenity or homogenity

    All algorithms take a number[][] as input
    In the context of groups, it is number[students][criteria]
*/

/**
 * @summary Measures the balance of criterias in a group
 * @param {number[][]} criteria 2d array with students and their criterias
 * @returns {number} the calculated score
 */
function balance(criteria){
    let score = 0;
    for (const criterionValues of criteria) {
        let criterionSum = 0;
        for (const criterionValue of criterionValues) {
            criterionSum += criterionValue;
        }
        score += Math.abs(criterionSum);
    }
    return score;
}

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
}

/**
 * @summary Measures the euclid distance between point1 and point2
 * @param {number[]} point1 n dimensional point in space
 * @param {number[]} point2 n dimensional point in space
 * @returns {number} the calculated euclid distance
 * @throws Throws when dimensions dont match
 */
function euclidDistance(point1, point2){
    if (point1.length !== point2.length){
        throw new Error("Mismatching dimensions");
    }
    let innerSum = 0;
    for (let i = 0; i < point1.length; i++) {
        innerSum += Math.pow(point1-point2, 2);
    }
    return Math.sqrt(innerSum);
}