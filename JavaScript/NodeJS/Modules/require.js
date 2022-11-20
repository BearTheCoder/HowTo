/*
  Require in NodeJS is the same as import in Vanilla JS
  The only difference is that import has to be called at the top of the file and require can be called anywhere in the file.
  Also, you can't use import in NodeJS and you can't use require in VanillaJS
  
  In VanillaJS there are two ways you can access other scripts.
  Firstly, by including it as a script tag at the bottom of the HTML file.
  Secondly, by using import and export.
  
  The difference? Having a script tag at the bottom of the HTML file allows all scripts to access everything within that file.
  Import and Export on the other hand will only allow other files to have access to things you have explictly allowed outside of the file.
  
  In NodeJS, we don't have the equivalent to an HTML file. So instead, we use require/export.
*/

const exports_1 = require("./exports_1.js"); // Get Object
const { addTwoPlusTwo, addTPT, } = require("./exports_1.js"); // Get Object Properties and Methods

//Both of these are the same
let four = exports_1.addTwoPlusTwo();
console.log(four) // Output: 4

four = addTwoPlusTwo();
console.log(four) // Output: 4

//Both of these are the same
let six = exports_1.addTPT();
console.log(six) // Output: 6

six = addTPT();
console.log(six) // Output: 6

//Require can be called at any point in the script
const exports_2 = require("./exports_2.js"); // Get Object
const { numberArray, addAllInNumberArray, } = require("./exports_2.js"); // Get Object Properties and Methods

//Both of these are the same
let total = exports_2.addAllInNumberArray(exports_2.numberArray);
console.log(total) // Output: 45v

let total = exports_2.addAllInNumberArray(exports_2.numberArray);
console.log(total) // Output: 45
