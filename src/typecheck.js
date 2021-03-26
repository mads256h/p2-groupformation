module.exports = {isType, isInstance, isNumber, isArray, arrayItemsIsType, arrayItemsIsInstance, isString, range, isInteger};

function isType(value, type){
    if (typeof value !== type) {
        throw new TypeError(`value is not of type ${type}`);
    }
}

function isInstance(value, type){
    if (!type[Symbol.hasInstance](value)) {
        throw new TypeError(`value is not an instance of ${type}`);
    }
}

function isNumber(value){
    isType(value, "number");
}

function isArray(value) {
    if (!Array.isArray(value)) {
        throw new TypeError("value is not an array");
    }
}

function arrayItemsIsType(value, type) {
    isArray(value);
    for(let item of value){
        isType(item, type);
    }
}

function arrayItemsIsInstance(value, type) {
    isArray(value);
    for(let item of value){
        isInstance(item, type);
    }
}

function isString(value) {
    isType(value, "string");
}

function range(value, min, max) {
    if (value < min || value > max){
        throw new RangeError(`Value is outside ${min} and ${max}`);
    }
}

function isInteger(value) {
    isNumber(value);
    if (!Number.isInteger(value)){
        throw new TypeError("value is not an integer");
    }
}