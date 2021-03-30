module.exports = {euclidDistance, lpDistance, transposeArray};

const {assertArray, assertArrayLengthEq} = require("./typeassert");

/**
 * @summary Measures the euclid distance between point1 and point2
 * @param {number[]} point1 n dimensional point in space
 * @param {number[]} point2 n dimensional point in space
 * @returns {number} the calculated euclid distance
 * @throws {TypeError} Throws when dimensions dont match
 */
function euclidDistance(point1, point2){
    return lpDistance(point1, point2, 2);
}

/**
 * @summary Measures the Lp norm distance between point1 and point2
 * @param {number[]} point1 n dimensional point in space
 * @param {number[]} point2 n dimensional point in space
 * @param {number} p The p in Lp norm. p=2 is euclid, p=1 is manhattan, etc.
 * @returns {number} the calculated Lp distance
 * @throws {TypeError} Throws when dimensions dont match or less than 1 dimensions
 * @throws {RangeError} Throws when p=0
 */
function lpDistance(point1, point2, p){
    if (point1.length !== point2.length){
        throw new TypeError("Mismatching dimensions between points");
    }
    if (point1.length <= 0){
        throw new TypeError("points need atleast 1 dimension");
    }
    if (p === 0){
        throw new RangeError("p must not be 0 to avoid infinities!");
    }

    let innerSum = 0;
    for (let i = 0; i < point1.length; i++) {
        innerSum += Math.pow(Math.abs(point1[i]-point2[i]), p);
    }
    return Math.pow(innerSum, 1/p);
}

/**
 * @summary Transposes a 2D array
 * @param {any[][]} array The 2D array to transpose
 * @returns {any[][]} The transposed array
 * @throws {TypeError} array is not a 2D array
 * @throws {RangeError} array is a staggered array
 */
function transposeArray(array) {
    assertArray(array);
    assertArrayLengthEq(...array);

    return array[0].map((_,i) => array.map(x => x[i]));
}
