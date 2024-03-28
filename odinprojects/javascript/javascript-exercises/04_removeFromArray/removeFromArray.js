const removeFromArray = function(givenArray, ...values) {
    for (let i = 0; i < values.length; i++) {
        let value = values[i];
        
        for (let j = 0; j < givenArray.length; j++) {
            if (givenArray[j] === value) {
                givenArray.splice(j, 1);
                break;
            }
        }
    }

    return givenArray;
};

// Do not edit below this line
module.exports = removeFromArray;