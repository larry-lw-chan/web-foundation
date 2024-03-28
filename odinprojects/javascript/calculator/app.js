// Calculator Storage
let CALCULATOR_STORE = "";

function calculate() {
    // Get list of items to process from CALCULATOR_STORE
    let itemList = CALCULATOR_STORE.split(" ");

    // Do Calculations
    let number = 0;
    let sign = "";
    for (i in itemList) {
        let isNumber = /[0-9.]+/.test(itemList[i]);
        if (isNumber && sign === "") {
            number = Number(itemList[i]);
        }
        else if (!isNumber) {
            sign = itemList[i];
        }
        else {
            number = getCalculation(number, Number(itemList[i]), sign);
        }
    }
    
    // Round Up Number
    number = Math.round(number * 100) / 100;
    if (number.toString().length > 12) {
        number = "Err: Num Too Big";
    }

    // Clear Calculator Store
    CALCULATOR_STORE = `${number}`;
    updateDisplay();
}

function getCalculation(num1, num2, sign) {
    switch(sign) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;    
        case "/":
            return num1 / num2;
        case "%":
            return num1 % num2;
    }
}

function updateDisplay(text=CALCULATOR_STORE) {
    let screen = document.querySelector("#screen");
    screen.textContent = text;
}

function setNumber() {
    // If string is empty, simply add number to string
    if (CALCULATOR_STORE.length === 0) {
        CALCULATOR_STORE += this.name;
    }
    else {
        let lastIdx = CALCULATOR_STORE.length - 1; 
        let isNumber = /[0-9.]+/.test(CALCULATOR_STORE[lastIdx]);
        if (isNumber) {
            CALCULATOR_STORE += this.name;
        }
        else {
            CALCULATOR_STORE += ` ${this.name}`;
        }
    }    
    updateDisplay();
}

function setSigns() {
    // Do nothing if there is no value
    if (CALCULATOR_STORE.length === 0) return;

    // Check and see if last value is a number
    let lastIdx = CALCULATOR_STORE.length - 1; 
    let isNumber = /[0-9.]+/.test(CALCULATOR_STORE[lastIdx]);
    
    if (isNumber) {
        CALCULATOR_STORE += ` ${this.name}`;
    } 
    else {
        CALCULATOR_STORE = CALCULATOR_STORE.slice(0, lastIdx) + this.name;
    }
    updateDisplay();
}

function setDot() {
    // Do nothing if there is no initial number.
    if (CALCULATOR_STORE.length === 0) return;

    // Check and see if last value is a number
    let itemList = CALCULATOR_STORE.split(" ");
    let lastIdx = itemList.length - 1; 
    let isDotlessNumber = /^[0-9]+$/.test(itemList[lastIdx]);

    // Add dot if existing number does not have preexisting dot
    if (isDotlessNumber) {
        CALCULATOR_STORE = CALCULATOR_STORE + this.name;
    }
    updateDisplay();
}

function allClearDisplay() {
    CALCULATOR_STORE = "";
    let screen = document.querySelector("#screen");
    screen.textContent = 0;    
}

function clearDisplay() {
    if (CALCULATOR_STORE.length === 0) {
        updateDisplay(0);
    }
    else {
        let lastIdx = CALCULATOR_STORE.length - 1; 
        let isNumber = /[0-9.]+/.test(CALCULATOR_STORE[lastIdx]);
        // Slice to last index when number, if sign then slice one more
        if (isNumber) {
            CALCULATOR_STORE = CALCULATOR_STORE.slice(0, lastIdx);
        }
        else {
            CALCULATOR_STORE = CALCULATOR_STORE.slice(0, lastIdx - 1);
        }
        // Add a default 0 to display if CALCULATOR_STORE is now empty
        if (CALCULATOR_STORE.length === 0) {
            updateDisplay(0);
        } else {
            updateDisplay();
        }
    }
}

function initializeEvents() {
    // Initialize Number Button Event Listener
    const numButtonList = document.querySelectorAll("#keypads button.number");
    numButtonList.forEach(button => button.addEventListener("click", setNumber));

    // Initialize All-Clear Display Event Listener
    const allClear = document.querySelector("#keypads #all-clear");
    allClear.addEventListener("click", allClearDisplay);

    // Initialize Clear Display Event Handler
    const clear = document.querySelector("#keypads button[name='clear']");
    clear.addEventListener("click", clearDisplay);

    // Initialize all signs
    const signList = document.querySelectorAll("#keypads .sign");
    signList.forEach(sign => sign.addEventListener("click", setSigns));

    // Initialize Dot
    const dotButton = document.querySelector("#keypads .dot");
    dotButton.addEventListener("click", setDot);

    // Calculate
    const equal = document.querySelector("#keypads .equal");
    equal.addEventListener("click", calculate);
}

window.onload = () => {
    allClearDisplay();
    initializeEvents();
}