const fakeRequest = function(url) {
    return new Promise((resolve, reject) => {
        let rand = Math.random();
        setTimeout(() => {
            if (rand < 0.7) resolve("Your fake data here");
            reject("Request Rejected");
        }, 1000);
    });
}

fakeRequest('/dogs/1/')
    .then((data) => {
        console.log("Done with request!");
        console.log("Data is:", data);
    })
    .catch((err) => {
        console.log("OH NO: ", err);
    });


const delayedColorChange = (newColor, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = newColor;
            resolve();
        }, delay);
    });
}

// STILL A LOT OF NESTING!!!
// delayedColorChange('red', 1000)
//     .then(() => delayedColorChange('orange', 1000))
//     .then(() => delayedColorChange('yellow', 1000))
//     .then(() => delayedColorChange('green', 1000))
//     .then(() => delayedColorChange('blue', 1000));


// Random Experiments
let login = function(username, password) {
    return new Promise((resolve, reject) => {
        if (!username || !password) {
            reject("Missing Credentials");
        } 
        if (password === "password") {
            resolve(username);
        }
        reject("Invalid password/username");
    });
}

let login2 = async (username, password) => {
    if (!username || !password) throw "Missing Credentials";
    if (password === "password") return "Welcome!";
    throw "Invalid Password";
}

login('larsc', 'password')
    .then((msg) => console.log("LOGGED IN: " + msg))
    .catch((err) => console.log("Error: " + err));


// New Delay Color Change
// const delayedColorChange = async (newColor, delay) => {    
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor;
//     }, delay);
//     return "Success";
// }

async function rainbow() {
    await delayedColorChange('red', 1000);
    await delayedColorChange('orange', 1000);
    await delayedColorChange('yellow', 1000);
    await delayedColorChange('blue', 1000);
    await delayedColorChange('indigo', 1000);
    return "All Done";
}

// rainbow().then(()=> console.log("End of Rainbow!"));