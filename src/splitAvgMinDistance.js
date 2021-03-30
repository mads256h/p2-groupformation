module.exports = {splitAvgMinDistance};
const {
    assertArray,
    assertArrayItemsInstanceOf,
    assertArrayLengthEq,
    assertArraysOfArrayNotEmpty,
    assertArrayNotEmpty
} = require("./typeassert");

/**
 * @summary Rates the average 1 dimensional distance from 0 to 1
 * @param {number[][]} criteria 2d array with students and their criterias (assumes range -1 to 1)
 * @returns {number} the calculated score
 */
function splitAvgMinDistance(criteria){
    assertArray(criteria);
    assertArrayNotEmpty(criteria);
    assertArrayItemsInstanceOf(criteria, Array);
    assertArraysOfArrayNotEmpty(criteria);
    assertArrayLengthEq(...criteria);

    let sumDist = 0;
    for(let i = 0; i < criteria[0].length; i++){
        for(let student1 = 0; student1 < criteria.length; student1++){
            let minDist = Infinity;
            for(let student2 = 0; student2 < criteria.length; student2++){
                if(student1 !== student2){
                    let curDist = Math.abs(criteria[student1][i] - criteria[student2][i]);
                    minDist = Math.min(curDist, minDist);
                }
            }
            sumDist += minDist;
        }
    }
    return ((sumDist/criteria[0].length)/criteria.length)/maxScore(criteria.length);
}

/**
 * @summary Max possible score of splitAvgMinDistance assuming range -1 to 1
 * @param {number} nrStudents The number of students in the given group
 * @returns {number} Max possible score
 */
function maxScore(nrStudents){
    return 2/(nrStudents-1);
}