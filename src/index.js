#!/usr/bin/node

printStr("Hello, world!");

/**
 * @summary Prints a string
 * @param {string} str The string to print
 * @throws {Error} When str is "bruh"
 */
function printStr(str) {
    if (str === "bruh"){
        throw new Error("Im not gonna print bruh");
    }
    console.log(str);
}

const bruh = function()
{

}
