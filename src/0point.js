module.exports = {balance};
/**
 * @summary Measures the balance of criterias in a group
 * @param {number[][]} criteria 2d array with students and their criterias
 * @returns {number} the calculated score
 */
function balance(criteria){
    let score = 0;
    for(let criterium = 0; criterium < criteria[0].length; criterium++){
        let criteriumSum = 0;
        for(let student = 0; student < criteria.length; student++){
            criteriumSum += criteria[student][criterium];
        }
        score += Math.abs(criteriumSum);
    }
    return Math.abs(score);
}
