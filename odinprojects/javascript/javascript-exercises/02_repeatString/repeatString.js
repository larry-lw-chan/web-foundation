const repeatString = function(text, num) {
    // Handle edge cases
    if (num < 0) return 'ERROR';
    if (num == 0) return '';

    let result = "";
    for (let i = 1; i <= num; i++) {
        result += text;
    }
    return result;
};

// Do not edit below this line
module.exports = repeatString;
