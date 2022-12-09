// *****      REVERSING EXPONENTS     *****

let a = 2;
let b = 2;
let c = 2;

//Ok since a ** (b * c) === 16, how do we solve the following?

let d = null;

d ** 4 === 16; //What is d? (ignoring that we already know)

d ** (4 * (1 / 4)) === 16 ** (1 / 4);
d === 2;

// Proof

if (16 ** (1 / 4) === 2) {
 console.log("solved");
}