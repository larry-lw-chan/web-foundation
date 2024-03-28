const caesar = function(str, num) {
    // 65-90 is upper case A-Z
    // 97-122 is lower case a-z
    let shift = num % 26;
    let result = '';
    // Iterate each letter inside the string
    for (let i = 0; i < str.length; i++) {
        let letter = str[i];
        let charCode = letter.charCodeAt();
        // Do Capital Calculations
        if (charCode >= 65 && charCode <= 90) {
            let newCharCode = charCode + shift;
            if (newCharCode > 90) { newCharCode = (newCharCode - 90) + 64; }
            if (newCharCode < 65) { newCharCode = 91 - (65 - newCharCode); }
            result += String.fromCharCode(newCharCode);
        }
        // Do Lower Case Calculations
        else if (charCode >= 97 && charCode <= 122) {
            let newCharCode = charCode + shift;
            if (newCharCode > 122) { newCharCode = (newCharCode - 122) + 96; }
            if (newCharCode < 97) { newCharCode = 132 (97 - newCharCode); }
            result += String.fromCharCode(newCharCode);
        }
        // Do not bother ciphering puntuations
        else { result += letter; }        
    }
    return result;
};

// Do not edit below this line
module.exports = caesar;
