const findTheOldest = function(people) {
    return people.reduce((accum, person) => {
        // Fill yearOfDeath with current year if person still alive
        if (accum['yearOfDeath'] === undefined) accum['yearOfDeath'] = new Date().getFullYear();
        if (person['yearOfDeath'] === undefined) person['yearOfDeath'] = new Date().getFullYear();

        // Get age of accum and person first by comparing their birth and death years
        let accumAge = accum['yearOfDeath'] - accum['yearOfBirth'];
        let personAge = person['yearOfDeath'] - person['yearOfBirth'];
        if (personAge > accumAge) accum = person;
        return accum;
    });
};

// Do not edit below this line
module.exports = findTheOldest;
