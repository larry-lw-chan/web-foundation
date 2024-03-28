// Debounce to make process less CPU intensive
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Start My App Logic Here
const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#FFF";
const RAINBOW_PALLETE = [
    "rgb(255, 0, 0)", 
    "rgb(255, 128, 0)", 
    "rgb(255, 255, 0)", 
    "rgb(0, 255, 0)", 
    "rgb(0, 255, 255)", 
    "rgb(0, 0, 255)", 
    "rgb(128, 0, 255)" 
];            

let mouseDrag = false;
function fillGridContainer(size=DEFAULT_SIZE) {
    const gridContainer = document.querySelector("#grid-container");
    // First Clear Gird Container
    gridContainer.innerHTML = "";
    // Now Fill Grid Container
    let sizeOfGrid = size * size;
    for (let i = 0; i < sizeOfGrid; i++) {
        let gridElement = document.createElement("div");
        gridElement.className = "grid-element";
        gridContainer.append(gridElement);
        gridElement.addEventListener("mousedown", () => mouseDrag = true);
        gridElement.addEventListener("mouseup", () => mouseDrag = false);
        gridElement.addEventListener("mousemove", debounce(setGridElement));
    }
    // Set New Grid Style
    gridContainer.style["grid-template-columns"] = `repeat(${size}, 1fr)`
}

function setGridElement(e) {
    if (mouseDrag) {
        // Detect Which Buttons Are Active
        let active = document.querySelector("#menu button.active"); 
        let color = getColor(active);
        this.style.backgroundColor = color;
    }
}

function getColor(active) {
    let colorPicker = document.getElementById("color-picker");
    switch (active.id) {
        case "colorMode":
            return colorPicker.value;
        case "rainboxMode":
            let random = Math.floor(Math.random() * 7);
            return RAINBOW_PALLETE[random];
        case "eraser":
            return DEFAULT_COLOR;
    }
}

function setActiveButton(e) {
    const buttonList = document.querySelectorAll("#menu button.edit");
    buttonList.forEach(button => button.classList.remove("active"));
    this.classList.add("active");
}

function setSlider(e) {
    let sliderLabel = document.querySelector("#slider p");
    sliderLabel.textContent = `${this.value} x ${this.value}`;
    // sliderLabel.textContent
    fillGridContainer(this.value);
}

function clearGrid() {
    let gridElements = document.querySelectorAll(".grid-element");
    gridElements.forEach(element => element.style.backgroundColor = DEFAULT_COLOR);
}

function setActiveMenu() {
    // Set default active button
    const activeButton = document.querySelector("#menu button");
    activeButton.classList.add("active");

    // Set active button event listener
    const buttonList = document.querySelectorAll("#menu button.edit");
    buttonList.forEach(button => button.addEventListener("click", setActiveButton));

    // Set Slider
    const slider = document.getElementById("size-slider");
    slider.addEventListener("change", setSlider);    

    // Set clear button event listener
    const clearButton = document.getElementById("clear-grid");
    clearButton.addEventListener("click", clearGrid);
}

window.addEventListener("load", (event) => {
    fillGridContainer();
    setActiveMenu();
});