module.exports = {splitAvgMinDistance};

const {
    assertArray,
    assertArrayItemsInstanceOf,
    assertArrayLengthEq,
    assertArraysOfArrayNotEmpty,
    assertArrayNotEmpty
} = require("./typeassert");
/**
 * @summary Measures the max distance between all criterias.
 * @param {number[][]} criteria 2d array with students and their criterias
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
 * maxScore bla bla
 * @param {*criteria.length} nrStudents The number of students in the given group
 * @returns 1
 */
function maxScore(nrStudents){
    //return (nrStudents)/(nrstudents-1);
    return 2/(nrStudents-1);
}