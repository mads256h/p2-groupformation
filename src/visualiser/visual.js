/**
 * @summary Finds the max distance between to numbers
 * @param {number} NumberOne The number to add to NumerTwo
 * @param {number} NumberTwo The number to add to NumerOne
 * @returns {number} The result of the two numbers added togther
 * @throws {TypeError} On invalid arguments
 */
function absoluteValueOfTwoNumbers(NumberOne, NumberTwo){
    return Math.abs(NumberOne)+Math.abs(NumberTwo);
}

/**
 * @summary Finds the max and min value in the array
 * @param {Array} array Array of numbers
 * @returns {number} Distance between the max and min value in the array
 * @throws {TypeError} On invalid arguments
 */
function maxsMin(array){
    let newArray = array.slice();
    newArray.sort(function(a, b){
        return a - b;
    });
    return absoluteValueOfTwoNumbers(newArray[0], newArray[newArray.length-1]);
}

/**
 * @summary Finds the sum
 * @param {Array} array Array of numbers
 * @returns {number} The result of the sum
 * @throws {TypeError} On invalid arguments
 */
function sum(array){
    return array.reduce((a, b) => a+b, 0);
}
let eksample = [1, -11 , 11, 2];
//let perfekt = [11, 3, -3 -11];

console.log(maxsMin(eksample));
console.log(sum(eksample));