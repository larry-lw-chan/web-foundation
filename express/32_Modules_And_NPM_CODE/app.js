const math = require('./math');

console.log(math.add(2,3))
console.log(math.square(2,3))
console.log(math.PI)

const {add, square, PI} = require('./math');
console.log(add(2,3))
console.log(square(2,3))
console.log(PI)

const cats = require('./shelter')
console.log("REQUIRED AN ENTIRE DIRECTORY!", cats)
