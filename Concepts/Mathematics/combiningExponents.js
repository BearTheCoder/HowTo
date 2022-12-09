// *****     

let a = 2;
let b = 2;
let c = 2;

if ((a ** b) ** c === a ** (b * c)) {
 console.log('Both are equal...');
}

//Why is this true?

b * c === 4; //true
a ** 4 === 16; //true

a ** b === 4; //true
c ** 4 === 16; //true
