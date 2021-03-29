module.exports = {maxDistance};
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
function maxDistance(criteria){
    assertArray(criteria);
    assertArrayNotEmpty(criteria);
    assertArrayItemsInstanceOf(criteria, Array);
    assertArraysOfArrayNotEmpty(criteria);
    assertArrayLengthEq(...criteria);

    let value = 0;

    for(let i = 0; i < criteria[0].length; i++){
        let max = -Infinity, min = Infinity;
        for(let student = 0; student < criteria.length; student++){
            min = Math.min(min, criteria[student][i]);
            max = Math.max(max, criteria[student][i]);
        }
        value += max + (-min);
    }
    return value/criteria[0].length;
}
