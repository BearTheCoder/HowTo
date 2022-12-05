/*
  A callback function is just a function, but it is fed into a second function as a 
    parameter and is called within the first function.

  A callback function's primary purpose is combining code that is determined to be needed,
    with code that can be modified to with the needed code.

  The best example of a callback function is the forEach loop.
  A forEach loops primary purpose is to loop through each element of an array, correct?
  Well, then we have a determined amount of work that need to be done NO MATTER WHAT.
  So, below, I have written out in functions what a forEach loop basically does.
*/


// Short hand - With anonymous function ---
const myFunction = (callbackFunction) => { 
  callbackFunction("hello world"); 
}
myFunction((phrase2) => { 
  console.log(phrase2); 
});

// Long way of doing it - Easier to understand ---
function firstFunction(phrase2) { 
  console.log(phrase2);
}
function secondFunction(callbackFunction){
  const phrase = 'hello world';
  callbackFunction(phrase);
}
secondFunction(firstFunction);

// forEach loop (a callback function) ---
let phrases = ["hello world", "i'll be back", "i'm walking here!", "Houstin, we have lift off"];
phrases.forEach((phrase, index) => {
  console.log(`${index} ${phrase}`)
})

// forEach loop without a forEach loop ---
/* 
  An array is basically an object that has associated methods and properties...
  A forEach loop is basically a for loop that is already formatted for the count of elements you have...
  Hence we can represent the same phrases array and a forEach loop as such:
*/
const myPhrases = {
  array: ["hello world", "i'll be back", "i'm walking here!", "Houstin, we have lift off"],
  forEachFunction: function(callbackFunction) {
    for (let i = 0; i < this.array.length; i++) {
      callbackFunction(this.array[i], i);
    }
  },
}

/*
  It's important to remeber that "myPhrases" is representing the array, and "forEachFunction" is 
  representing the forEach loop. The callback function is the same as before.
*/
myPhrases.forEachFunction((phrase, index) => {
  console.log(`${index} ${phrase}`)
})
