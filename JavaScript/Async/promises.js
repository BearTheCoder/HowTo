function logToConsole(a, b) {
  return new Promise((thenFunc, catchFunc) => {
    if (a + b > 5) {
      parameterOne = `IS GREATER THAN 5`;
      parameterTwo = a + b;
      thenFunc(parameterOne, parameterTwo);
    }
    else {
      catchFunc(`...is not greater than 5.`, a + b);
    }
  });
}

let a = 2;
let b = 7;

//Outputs: 9 IS GREATER THAN 5
logToConsole(a, b)
  .then((message, total) => {
    console.log(`${total} ${message}`);
  })
  .catch((message, total) => {
    console.log(`${total} ${message}`);
  });

a = 2;
b = 2;

//Outputs: 4...is not greater than 5.
logToConsole(a, b)
  .then((message, total) => {
    console.log(`${total} ${message}`);
  })
  .catch((message, total) => {
    console.log(`${total}${message}`);
  });
