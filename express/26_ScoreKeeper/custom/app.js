
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");

function addScore(e) {
    // Check if either score equal round limit 
    let roundLimit = document.getElementById("roundLimit");
    if (Number(score1.innerText) >= roundLimit.valueAsNumber || Number(score2.innerText) >= roundLimit.valueAsNumber) {
        alert("You need to reset the game");
        exit; 
    }
    
    // Adjust Score
    if (e.target.id === 'addScore1') { 
        score1.innerText = Number(score1.innerText) + 1;
    } 
    else {
        score2.innerText = Number(score2.innerText) + 1;
    }

    // Set Appropriate Colors
    if (Number(score1.innerText) > Number(score2.innerText)) {
        score1.className = "green";
        score2.className = "red";
    }

    else if (Number(score2.innerText) > Number(score1.innerText)) {
        score1.className = "red";
        score2.className = "green";
    }

    else {
        score1.className = "blue";
        score2.className = "blue";
    }
}

function reset(e) {
    score1.innerText = "0";
    score2.innerText = "0";

    score1.className = "";
    score2.className = "";
}

window.addEventListener('load', function(e) {
    document.getElementById("addScore1").addEventListener("click", addScore);
    document.getElementById("addScore2").addEventListener("click", addScore);
    document.getElementById("scoreReset").addEventListener("click", reset);
});