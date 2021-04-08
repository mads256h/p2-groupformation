(function(){
    /**
     * @summary Finds the distance between the min and max value in the array
     * @param {number[]} array Array of numbers
     * @returns {number} Distance between the max and min value in the array
     */
    function distanceBetweenExtremes(array) {
        const min = Math.min(...array);
        const max = Math.max(...array);
        return max - min;
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
     * @param {number[]} array Array of numbers
     * @returns {number} The sum of all the lengths between the numbers
     * @throws {RangeError} On invalid arguments
     */
    function distribution(array) {
        if (array.length === 1) {
            throw new RangeError("To few arguments");
        }
        else {
            const newArray = array.slice();
            newArray.sort(function(a, b) {
                return a - b;
            });
            let sum = 0;
            const pef = perfectDist(newArray.length);
            for (let index = 0; index < newArray.length; index++) {
                sum += Math.abs(newArray[index] - pef[index]);
            }
            return sum;
        }
    }

    /**
     * @summary Makes the perfect array of numbers with a perfect distances between
     * @param {number} n The number of indexs needed in the array
     * @returns {Array} The calulated array
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

    window.visualjs = {
        distribution,
        sumOfArray,
        distanceBetweenExtremes
    };
}());