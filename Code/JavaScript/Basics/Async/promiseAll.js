/* 
  Async/Await is JavaScript ES8's solution to promises.
  As we know, promise chains can get messy, and having to wait for something to complete
  that is within a promise chain in order to do work outside of a promise chain is poorly optimized.

  Async/Await solves that issue.
*/

function returnAddedPromise (a, b) {
 return new Promise(resolved => {
  setTimeout(() => {
   resolved(a + b);
  }, 2000);
 });
}

function returnMultiplyPromise (a, b) {
 return new Promise(resolved => {
  setTimeout(() => {
   resolved(a * b);
  }, 2000);
 });
}

function returnSquaredPromise (a) {
 return new Promise(resolved => {
  setTimeout(() => {
   resolved(a ** 2);
  }, 2000);
 });
}

let promiseArray = [];


for (let i = 0; i < 10; i++) {
 promiseArray.push(returnAddedPromise(i, i));
}

Promise.resolved;

Promise.all(promiseArray)
 .then(result => {
  promiseArray = [];
  result.forEach((element) => {
   promiseArray.push(returnMultiplyPromise(element, element));
  });
 });





