/*
    There are a few different ways to write functions, below are and example of each.
*/

// Standard Function Declaration
function standardFunction (a, b) {
    return a * b;
}

// Standard Function Expression
const arrowFunctionStandard = function (a, b) {
    return a * b;
};

// Arrow Function Expression - Multi-line (return is not implied)
const multiLineArrowFunction = (a, b) => {
    return a * b;
};

// Arrow Function Expression - Single-line (return is implied)
const inLineFunction = (a, b) => a * b;

// Arrow Function Expression - Single-line Single-Parameter (return is implied)
const inLineFunctionSingleParameter = a => a * 10;

// Arrow Function Expression - Single-line No Parameters (return is implied)
const inLineFunctionNoParameters = () => 2 * 10;

console.log(`Standard Function Declaration (2 * 10): ${ standardFunction(2, 10) }`);
console.log(`Standard Function Expression (2 * 10): ${ arrowFunctionStandard(2, 10) }`);
console.log(`Arrow Function Expression - Multi-line (2 * 10): ${ multiLineArrowFunction(2, 10) }`);
console.log(`In Line Arrow Function - 2 Parameters (2 * 10): ${ inLineFunction(2, 10) }`);
console.log(`In Line Arrow Function - 1 Parameters (2 * 10): ${ inLineFunctionSingleParameter(2) }`);
console.log(`In Line Arrow Function - 0 Parameters (2 * 10): ${ inLineFunctionNoParameters() }`);
