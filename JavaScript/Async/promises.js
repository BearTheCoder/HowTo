/* 
  A promise is JavaScript's first attempt at multithreading.
  When you create a promise you open up a different CPU thread to do calculations for you.
  As you may know this is helpful when you have calculations or processes that may take a while.
  A promise can be one of three states.
    * Pending
    * Fulfilled/Resolved
    * Rejected
  When you write a promise you can only come across a pending promise in one way:
    If you try to access an incomplete promise outside of the thread it is currently working.
  A fulfilled or rejected promise occurs after a promise has been completed.
  ".then()" is a function that handles the fulfilled promise when the promise is resolved.
  ".catch()" is a function that handles the rejected promise.
*/

// The resolved and rejected functions below only take in opne parameter each.
function logToConsole(a, b) {
  return new Promise((resolved, rejected) => {
    if (a + b > 5) {
      const parameter = `${a + b} IS GREATER THAN 5`;
      resolved(parameter);
    }
    else {
      rejected(`${a + b}...is not greater than 5.`);
    }
  });
}

let a = 2;
let b = 7;

//Outputs: 9 IS GREATER THAN 5
logToConsole(a, b)
  .then((message) => {
    console.log(`${message}`);
  })
  .catch((message) => {
    console.log(`${message}`);
  });

a = 2;
b = 2;

//Outputs: 4...is not greater than 5.
logToConsole(a, b)
  .then((message) => {
    console.log(`${message}`);
  })
  .catch((message) => {
    console.log(`${message}`);
  });


// Promise.resolve is only useful if you have a function that MIGHT return a promise.
function maybeReturnPromise(a) {
  if (a < 5) {
    return a;
  }
  else {
    return new Promise((thenFunc) => thenFunc(++a));
  }
}

maybeReturnPromise(6).then((data) => console.log(data)); //Outputs: 7
// maybeReturnPromise(4).then((data) => console.log(data)); // Error

Promise.resolve(maybeReturnPromise(4)).then((data) => console.log(data));


//Promise.all?
