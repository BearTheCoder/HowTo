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

// With returned promise - outside "then" function
const result3 = returnAddedPromise(1, 1)
 .then(result => returnMultiplyPromise(result, 2))
 .then(result => returnSquaredPromise(result));
console.log(result3);

// With promises - inside "then" function
returnAddedPromise(1, 1)
 .then(result => returnMultiplyPromise(result, 2))
 .then(result => returnSquaredPromise(result))
 .then(result => console.log(result));

//With async/await
awaitPromises();
async function awaitPromises () {
 // With await
 const result1 = await returnAddedPromise(1, 1);
 const result2 = await returnMultiplyPromise(result1, 2);
 const result3 = await returnSquaredPromise(result2);
 console.log(result3);
}
