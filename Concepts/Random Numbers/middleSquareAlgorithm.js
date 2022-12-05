// https://en.wikipedia.org/wiki/Middle-square_method

let seedNumber = 1111;

let number = seedNumber;
let alreadySeen = [];
counter = 0;

while (!alreadySeen.includes(number)) {
 counter++;
 alreadySeen.push(number);
 console.log(`Starting number: ${number}`);
 number *= number; //Square the number
 console.log(`Squared number: ${number}`);
 number = number.toString().padStart(8, 0); // Add zeros to make a 8 digit number
 console.log(`Padded number: ${number}`);
 number = number.substring(2, 6); //Grab middle 4
 console.log(`Middle digits: ${number}`);
 number = parseInt(number); //Conver to int
 console.log(`${counter}: ${number}`);
 console.log(`\n`);
}

console.log(`We began with ${seedNumber} and have repeated ourselves after ${counter} steps with ${number}.`);