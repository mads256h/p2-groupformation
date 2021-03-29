/**
 * @summary Finds the max distance between to numbers
 * @param {number} NumberOne The number to add to NumerTwo
 * @param {number} NumberTwo The number to add to NumerOne
 * @returns {number} The result of the two numbers added togther
 * @throws {TypeError} On invalid arguments
 */
function absoluteValueOfTwoNumbers(NumberOne, NumberTwo) {
    return Math.abs(NumberOne) + Math.abs(NumberTwo);
}

/**
 * @summary Finds the max and min value in the array
 * @param {Array} array Array of numbers
 * @returns {number} Distance between the max and min value in the array
 * @throws {TypeError} On invalid arguments
 */
function maxsMin(array) {
    let newArray = array.slice();
    newArray.sort(function (a, b) {
        return a - b;
    });
    return absoluteValueOfTwoNumbers(newArray[0], newArray[newArray.length - 1]);
}

/**
 * @summary Finds the sum
 * @param {Array} array Array of numbers
 * @returns {number} The result of the sum
 * @throws {TypeError} On invalid arguments
 */
function sumOfArray(array){
    return array.reduce((a, b) => a + b, 0);
}

/**
 * @summary Finds the length between the numbers
 * @param {Array}array Array of numbers
 * @returns {number} The sum of all the lengths between the numbers
 * @throws {TypeError} On invalid arguments
 */
function distribution(array) {
    if (array.length === 1) {
        console.log("for få argrumenter");
    }
    else {
        let newArray = array.slice();
        newArray.sort(function (a, b) {
            return a - b;
        });
        let sum = 0;
        let pef = perfectDist(newArray.length);
        for (let index = 0; index < newArray.length; index++) {
            sum += newArray[index] - pef[index];
        }
        return sum;
    }
}

/**
 * @summary Makes the perfect array of numbers with a perfect distances between
 * @param {Array} n The number of indexs needed in the array
 * @returns {Array} The calulated array
 * @throws {TypeError} On invalid arguments
 */
function perfectDist(n) {
    let array = new Array();
    array[0] = -11;
    const rangeWidth = 22;
    for (let i = 1; i <= n - 1; i++) {
        array[i] = ((rangeWidth / (n - 1)) * i) - 11;
    }
    return array;
}

console.log(perfectDist(7));
let eksampleBad = [
    -1,
    -7.333333333333334,
    -3.666666666666667,
    0,
    3.666666666666666,
    7.333333333333332,
    11
];
let eksamplePef = [
    -11,
    -7.333333333333334,
    -3.666666666666667,
    0,
    3.666666666666666,
    7.333333333333332,
    11
];

distribution(eksampleBad);
distribution(eksamplePef);

//let perfekt = [11, 3, -3 -11];

//console.log(maxsMin(eksample));
//console.log(sum(eksample));