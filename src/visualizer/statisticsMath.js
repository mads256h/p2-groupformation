/**
 * @description This file contains functions that calculate statistical numbers which we use to evaluate the results
 */
(function(){
    window.statisticsMath = {
        distribution,
        sumOfArray,
        distanceBetweenExtremes,
        getLSValuesOfGroup
    };
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
            const sortedInputArray = learningStyleArray.slice().sort((a, b) => a - b);
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

    /**
     * @summary Creates and returns a new array with the learningstyle values(-11 to 11)
     * of the learningstyle with the learningstyle(e.g. active, visual, sensing..) name provided in the learnStyleName argument
     * @param {object} group the group from which to get the data
     * @param {string} learnStyleName the name of the learningstyle e.g. "activeReflective"
     * @returns {object} returns an object with the students of the groups values in the given learningstyle, the key is the students idx in the groups.students object
     */
    function getLSValuesOfGroup(group, learnStyleName){
        return group.students.map((s) => s.criteria.learningStyles[learnStyleName]);
    }
}());
