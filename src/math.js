module.exports = {plus, euclidDistance, lpDistance};
/**
 * @summary Adds two numbers together
 * @param {number} a The number to add to b
 * @param {number} b The number to add to a
 * @returns {number} The result
 * @throws {TypeError} On invalid arguments
 */
function plus(a, b) {
    if (typeof a !== "number") {
        throw new TypeError("a is not a number");
    }
    if (typeof b !== "number") {
        throw new TypeError("b is not a number");
    }

    return a + b;
}

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