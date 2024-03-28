const WIN = 1
const TIE = 0
const LOSE = -1

// Keep Track of Player Score
let PLAYERSCORE = 0;
let CPUSCORE = 0;

function getComputerChoice() {
    let random = Math.floor(Math.random() * 3) + 1;
    switch (random) {
        case 1:
            return "Rock";
        case 2:
            return "Paper";
        case 3:
            return "Scissor";               
    }
}

function cleanString(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        if (i === 0) {
            result += str[i].toUpperCase()
        }
        else {
            result += str[i].toLowerCase()
        }
    }
    return result;
}

function tallyScore(result) {
    if (result === WIN) {
        PLAYERSCORE += 1;
    }
    if (result === LOSE) {
        CPUSCORE += 1;
    }
}

function determineWinner() {
    if (PLAYERSCORE > CPUSCORE) {
        return "The winner is Player."
    } 
    else if (PLAYERSCORE < CPUSCORE) {
        return "The winner is Computer."
    }
    else {
        return "This game is tied."
    }
}

function playRound(playerSelection, computerSelection) {
    playerSelection = cleanString(playerSelection);

    // Pre-determined results via a simple dictionary (fast and no conditionals needed)
    let resultList = {
        'Rock': {
            'Scissor': ['You Win! Rock beats Scissor', WIN],
            'Paper': ['You Lose! Paper beats Rock', LOSE],
            'Rock': ['Tied! You both choose Rock', TIE]
        },
        'Paper': {
            'Rock': ['You Win! Paper beats Rock', WIN],
            'Scissor': ['You Lose! Scissor beats Paper', LOSE],
            'Paper': ['Tied! You both choose Paper', TIE]
        },
        'Scissor': {
            'Paper': ['You Win! Scissor beats Paper', WIN],
            'Rock': ['You Lose! Rock beats Scissor', LOSE],
            'Scissor': ['Tied! You both choose Scissor', TIE]
        }
    }
    
    let result = resultList[playerSelection][computerSelection];
    tallyScore(result[1])
    return result[0]
  }

function game(e) {
    // Reset score if either computer or user has 5 points
    if (PLAYERSCORE === 5 || CPUSCORE === 5) {
        PLAYERSCORE = 0;
        CPUSCORE = 0;
    }

    // Get Player Info
    let playerSelection = this.name;
    let computerSelection = getComputerChoice();

    // Remove all existing active buttons and assign active button to clicked button
    let playerButtons = document.querySelectorAll("button");
    playerButtons.forEach(button => button.classList.remove("active"));
    this.classList.add("active");

    // Display Result in #result h1
    let result = document.querySelector("#result h1");
    let text = playRound(playerSelection, computerSelection);

    // Change displayed text result if either player or computer won the game
    if (PLAYERSCORE === 5) { text = "You won five rounds.  You are the winner."; }
    if (CPUSCORE === 5) { text = "The computer won five rounds.  The computer is the winner."; }
    result.textContent = text;    

    // Update Player and Computer Score
    let playerScore = document.querySelector("#playerScore");
    let computerScore = document.querySelector("#computerScore");
    playerScore.textContent = `Player Score: ${PLAYERSCORE}`;
    computerScore.textContent = `Computer Score: ${CPUSCORE}`;

    // Show What the Computer Did
    let computerChoice = document.querySelector("#computerChoice");
    if (computerSelection === "Rock") {
        computerChoice.innerHTML = `<i class="fa-regular fa-hand-back-fist fa-7x"></i>`;
    }
    else if (computerSelection === "Paper") {
        computerChoice.innerHTML = `<i class="fa-regular fa-hand fa-7x"></i>`;
    }
    else {
        computerChoice.innerHTML = `<i class="fa-regular fa-hand-scissors fa-7x"></i>`;
    }
}

window.addEventListener("load", (event) => {
    const playerButtons = document.querySelectorAll("button");
    playerButtons.forEach(playerButton => playerButton.addEventListener("click", game));   
});