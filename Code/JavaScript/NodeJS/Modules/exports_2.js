numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
function addAllInNumberArray(numberArray) {
  let total = 0;
  numberArray.forEach(number => {
    total += number;
  });
  return total;
}

//This method should not be used, but it does work
module.exports = {
  numberArray,
  addAllInNumberArray,
};
