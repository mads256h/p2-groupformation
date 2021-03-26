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
