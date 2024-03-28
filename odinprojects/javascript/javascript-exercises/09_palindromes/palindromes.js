const palindromes = function (string) {
    // Clean strings
    let cleanStr = '';
    for (let i = 0; i < string.length; i++) {
        if (string[i].match(/[A-Za-z]/)) {
            cleanStr += string[i].toLowerCase();
        }
    }

    // Create two pointer i and j.  i represent index start and j represents index end
    let i = 0;
    let j = cleanStr.length - 1;
    
    while (true) {
        // If string of both pointers do not match, return false
        if (cleanStr[i] !== cleanStr[j]) return false;
        // Return true if both pointer either match or i is bigger than j
        if (i >= j) return true
        // Else increase pointer i and pointer j decreases.  Repeat    
        i++; j--;
    }
};

// Do not edit below this line
module.exports = palindromes;
