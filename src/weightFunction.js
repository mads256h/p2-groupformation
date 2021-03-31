module.exports = {constant, sigmoid0to2};

/**
 * @summary constant weight function
 * @param {number} number input
 * @returns {number} input
 */
function constant(number){
    return number;
}

/**
 * @summary Uses Sigmoid 0 to 2 function as a weight
 * @param {number} number input
 * @returns {number} Sigmoids funtion on number
 */
function sigmoid0to2(number){
    return 0.5 * Math.tanh(number * 2.5 - 2.5) + 0.5;
}