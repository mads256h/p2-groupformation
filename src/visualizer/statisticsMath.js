/**
 * @description This file contains functions that calculate statistical numbers which we use to evaluate the results
 */
(function(){
    /**
     * @summary Finds the distance between the min and max value in the array
     * @param {number[]} array Array of numbers
     * @returns {number} Distance between the max and min value in the array
     */
    function distanceBetweenExtremes(array) {
        const min = Math.min(...array);
        const max = Math.max(...array);
        return 22 - (max - min);
    }

    /**
     * @summary Finds the sum
     * @param {number[]} array Array of numbers
     * @returns {number} The result of the sum
     */
    function sumOfArray(array){
        return array.reduce((a, b) => a + b, 0);
    }

    /**
     * @summary Finds the length between the numbers
     * @param {number[]} learningStyleArray Array of numbers
     * @returns {number} The sum of all the lengths between the numbers
     * @throws {RangeError} On invalid arguments
     */
    function distribution(learningStyleArray) {
        if (learningStyleArray.length === 1) {
            return 0;
        }
        else {
            const sortedInputArray = learningStyleArray.slice().sort(function(a, b) {
                return a - b;
            });
            let sum = 0;
            const perfectDistribution = perfectDist(sortedInputArray.length);
            for (let index = 0; index < sortedInputArray.length; index++) {
                sum += Math.abs(sortedInputArray[index] - perfectDistribution[index]);
            }
            return sum;
        }
    }

    /**
     * @summary Makes the perfect array of numbers with a perfect distances between
     * @param {number} n The number of indexs needed in the array
     * @returns {number[]} The calulated array
     */
    function perfectDist(n) {
        const array = new Array();
        const rangeWidth = 22;
        for (let i = 0; i <= n - 1; i++) {
            array[i] = ((rangeWidth / (n - 1)) * i) - 11;
        }
        return array;
    }

    window.statisticsMath = {
        distribution,
        sumOfArray,
        distanceBetweenExtremes
    };
}());