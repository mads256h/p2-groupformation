/**
 * @summary Measures the average distance between students
 * @param {number[][]} criteria 2d array with students and their criterias
 * @returns {number} the calculated score
 */
function maxDistance(criteria){
    let value = 0;
    let max = -Infinity, min = Infinity;

    for(let i = 0; i < criteria[0].lenght; i++){
        
        for(let student = 0; student < criteria.lenght; student++){
            min = Math.min(min, criteria[student][i]);
            max = Math.max(max, criteria[student][i]);
        }
        Math.maxDistance(min, max);
    }
    return value;
}
