//For loops are similar to how that are in any other language, but foreach loops are handled a bit differently...

// Standard Array
const peopleArray = [ 'steve', 'clarence', 'Nevile', 'john', 'aaron', 'dave', 'tim', 'ed-ward' ];

// Task: Log each array element and it's index to an array

// For Loop
for (let i = 0; i < peopleArray.length; i++) {
    console.log(`${ i } ${ peopleArray[ i ] }`);
}

// For Each
peopleArray.forEach((person, index) => {
    console.log(`${ index } ${ person }`);
});

/*
    Arguable, you could say the foreach loop is cleaner, but that is about the only benefit it offers.
    While not the most important issue, for loops are faster than foreach loops.
        But we won't always have arrays of millions of items, so you'll hardly ever notice the difference.
    But, what is important are statements like "break" or "continue", or keywords like "await".
        You can't use these with a foreach loop.
    Generally, you should program for ease of use and readability over performance first and foremost.
        Then optimize if needed. So, if you don't need to use keywords like break, foreach is a great option.
*/
