/*
    In JavaScript you can assign functions to variables like you would a string or int.
    This is called a function expression and has some benefits.

    Firstly, the main difference between function declerations and function expressions is
    order in the stack.

    Function declarations are declared first but function expressions are assigned in order of the stack.

    This is called hoisting.

    Meaning you can have a function at the very bottom of your code, and if you declare a function instead of assigning it
    it will be created in memory first before anything else.

    This is similar to the difference between "let and const" vs "var".

    The differences can be seen below.
*/

// Works because declaration order is correct
const myName = "Aaron";
console.log(myName);

// Doesn't work because declaration order is incorrect
try {
    console.log(`My age is ${ age }`); //undefined
    const age = 30;
}
catch (err) {
    console.log(`Will not work, undefined reference error.`);
}

// Will work with no error because "var" is declared higher in stack but will not be assigned to
console.log(ethnicity); //returns undefined but no error
var ethnicity = "filipino";


// Will work because "var" is declared higher in the stack but assignment is done in order.
occupation = "Automotive";
console.log(occupation); // No error, returns "Automotive"
var occupation;

// Function declaration - Will work with no error because of hoisting.
console.log(returnHello());
function returnHello () {
    return "hello";
}

// Function Expression - Will not work because expressions are called in order of stack
try {
    console.log(returnHi());
    const returnHi = () => 'hi';
}
catch {
    console.log(`Will not work, undefined reference error.`);
}

// Function Expression - Will work because it is in correct order.
const returnBye = () => "bye";
console.log(returnBye());

