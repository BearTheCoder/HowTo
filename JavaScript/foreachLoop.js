//For loops are similar to how that are in any other language, but foreach loops are handled a bit differently...

// Standard Array
const peopleArray = [ 'steve', 'clarence', 'Nevile', 'john', 'aaron', 'dave', 'tim', 'ed-ward' ];

// Task: Log each array element and it's index to console.

// For Loop
for (let i = 0; i < peopleArray.length; i++) {
    console.log(`${ i } ${ peopleArray[ i ] }`);
}

// For Each
peopleArray.forEach((person, index) => {
    console.log(`${ index } ${ person }`);
});

/*
A couple notes:
    1.) Arguably, you could say the foreach loop is cleaner.
    2.) While not the most important issue, for loops are faster than foreach loops. 
        (by about 1.5x according to https://levelup.gitconnected.com/which-is-faster-for-for-of-foreach-loops-in-javascript-18dbd9ffbca9)
        But we won't always have arrays of millions of items, so you'll hardly ever notice the difference.
    3.) But, what is important are statements like "break" or "continue", or keywords like "await".
        You can't use these with a foreach loop.
*/
