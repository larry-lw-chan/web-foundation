const leapYears = function(year) {
    // Most Likely a Leap Year
    if (year % 4 == 0) {
        // Unless dividable by 100
        if (year % 100 == 0) {
            // Most likely not Leap Year unless divisable by 400
            if (year % 400 == 0) {
                return true;    
            }
            return false;
        }
        return true;
    }
    return false;
};

// Do not edit below this line
module.exports = leapYears;
