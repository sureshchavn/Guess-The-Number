//Declare Variables here
let secretNumber;
let attempts;
let maxAttempts;
let guesses; //This is an Array
let score;

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");
const historyEl = document.getElementById("history");
const scoreEl = document.getElementById("score");
const levelSelect = document.getElementById("level");

//Setup Game
function setupGame(){
    const level = levelSelect.value;
    if(level==="easy")
    {
        secretNumber = randomNumber(1,10);
        maxAttempts = 5;
    }
    else if(level==="medium"){
        secretNumber = randomNumber(1,50);
        maxAttempts = 7;
    }
    else{
        secretNumber = randomNumber(1,100);
        maxAttempts = 10;
    }

    attempts = 0;
    guesses = [];
    score = 0;

    updateUI();
    message.className ="message";
    message.textContent ="";
    guessInput.disabled = false;
    guessBtn.disabled = false;
    guessInput.value ="";
}

//Generate Random Number
function randomNumber(min, max){
    return Math.floor(Math.random()*(max - min + 1)) + min;
}

//Guess Button Event
guessBtn.addEventListener("click", function() {
    const guess = Number(guessInput.value);
    //Proper Validation
    if(isNaN(guess) || guessInput.value.trim() ===""){
        message.textContent = "Please enter the Valid Number";
        message.className = "message wrong";
        return;
    }
    attempts++;
    guesses.push(guess);
    attemptsEl.textContent = attempts;
    historyEl.textContent = guesses.join(",");  //Something like this for output show 2, 3, 4, 5,...

    if(guess === secretNumber){
        message.textContent ="Congratulations!! You have gussed the correct Number"
        message.className ="message correct";
        score = (maxAttempts - attempts)*10;
        scoreEl.textContent = score;
        endGame();
    }
    else if(guess > secretNumber){
        message.textContent ="Too High! Try a Lower number";
        message.className ="message wrong"

    }
    else{
        message.textContent ="Too Low! Try a Higher number";
        message.className ="message wrong"
    }

    if(attempts >= maxAttempts && guess!==secretNumber){
        message.textContent = `Game Over!! The number was ${secretNumber}.`;
        message.className = "message wrong";
        endGame();
    }
    guessInput.value="";
});

//Restart Button (Added ONCE)
  restartBtn.addEventListener("click", setupGame);

//Level Change(Added ONCE)
levelSelect.addEventListener("change", setupGame);

//End Game
function endGame(){
    guessInput.disabled = true;
    guessBtn.disabled = true; 
}

//Update UI
function updateUI(){
    attemptsEl.textContent = attempts;
    historyEl.textContent = "--";
    scoreEl.textContent = score;
}

//Initialize
setupGame();