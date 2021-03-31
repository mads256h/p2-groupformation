module.exports = {averageVectorMinDistance, averageVectorDistance};
const {
    assertArray,
    assertArrayItemsInstanceOf,
    assertArrayLengthEq,
    assertArraysOfArrayNotEmpty,
    assertArrayNotEmpty,
    assertNumber,
    assertFunction
} = require("./typeassert");
const {lpDistance} = require("./math.js");

/**
 * @summary Measures distribution of vectors in vectorspace by summing minimum distances
 * @param {number[][]} criteria 2d array with students and their criterias
 * @param {number} p p value for lpdistance function
 * @param {Function} weighFunc function that adds a weight
 * @returns {number} the calculated score
 */
function averageVectorMinDistance(criteria, p, weighFunc){
    assertArray(criteria);
    assertArrayNotEmpty(criteria);
    assertArrayItemsInstanceOf(criteria, Array);
    assertArraysOfArrayNotEmpty(criteria);
    assertArrayLengthEq(...criteria);
    assertNumber(p);
    assertFunction(weighFunc);

    let score = 0;
    let totalDistances = 0;
    for (let i = 0; i < criteria.length; i++) {
        let minDist = Infinity;
        for (let j = 0; j < criteria.length; j++) {
            if (i !== j){
                minDist = weighFunc(Math.min(minDist, lpDistance(criteria[i], criteria[j], p)));
            }
        }
        score += minDist;
        totalDistances++;
    }
    return score / totalDistances;
}




/**
 * @summary Calculates average Lp distance between all vectors
 * @param {number[][]} criteria 2d array with students and their criterias
 * @param {number} p p value for lpdistance function
 * @param {Function} weighFunc function that adds a weight
 * @returns {number} the calculated score
 */
function averageVectorDistance(criteria, p, weighFunc){
    assertArray(criteria);
    assertArrayNotEmpty(criteria);
    assertArrayItemsInstanceOf(criteria, Array);
    assertArraysOfArrayNotEmpty(criteria);
    assertArrayLengthEq(...criteria);
    assertNumber(p);
    assertFunction(weighFunc);

    let score = 0;
    let totalDistances = 0;
    for (let criteria1 = 0; criteria1 < criteria.length; criteria1++) {
        let distanceSum = 0;
        for (let criteria2 = 0; criteria2 < criteria.length; criteria2++) {
            if (criteria1 !== criteria2){
                distanceSum += weighFunc(lpDistance(criteria[criteria1], criteria[criteria2], p));
                totalDistances++;
            }
        }
        score += distanceSum;
    }
    return score / totalDistances;
}