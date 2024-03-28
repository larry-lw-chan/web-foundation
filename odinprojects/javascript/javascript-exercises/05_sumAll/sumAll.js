const sumAll = function(num1, num2) {
    // Handle Negative numbers
    if (num1 < 0 || num2 < 0) return 'ERROR';
    // Handle Non-Number Types
    if (typeof num1 !== 'number' || typeof num2 !== 'number') return 'ERROR';
    
    // write code to determine larger and smaller number
    let smallNum = num1 < num2 ? num1 : num2;
    let largeNum = num1 > num2 ? num1 : num2;

    let sum = 0;
    for (let i = smallNum; i <= largeNum; i++) {
        sum += i;
    }
    return sum;
};

sumAll(1, 4) // returns the sum of 1 + 2 + 3 + 4 which is 10

// Do not edit below this line
module.exports = sumAll;