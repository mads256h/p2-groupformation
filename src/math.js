module.exports = plus;
/**
 * @summary Adds two numbers together
 * @param {number} a
 * @param {number} b
 * @returns {number} The result
 * @throws {TypeError} On invalid arguments
 */
function plus(a, b)
{
    if (typeof a !== "number") { throw new TypeError("a is not a number"); }
    if (typeof b !== "number") { throw new TypeError("b is not a number"); }

    return a + b;
}

