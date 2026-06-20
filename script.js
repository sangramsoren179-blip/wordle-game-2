const words = [
    "APPLE",
    "GRAPE",
    "HOUSE",
    "WATER",
    "MOUSE",
    "LIGHT",
    "PLANT",
    "BRAVE",
    "STONE",
    "CLOUD"
];

const secretWord =
    words[Math.floor(Math.random() * words.length)];

const board = document.getElementById("board");
const input = document.getElementById("guessInput");
const button = document.getElementById("guessBtn");
const message = document.getElementById("message");

let attempts = 0;
const maxAttempts = 6;

button.addEventListener("click", checkGuess);

input.addEventListener("keydown", e => {
    if(e.key === "Enter"){
        checkGuess();
    }
});

function checkGuess(){

    const guess = input.value.toUpperCase();

    if(guess.length !== 5){
        message.textContent =
            "Please enter a 5-letter word.";
        return;
    }

    if(attempts >= maxAttempts){
        return;
    }

    for(let i=0;i<5;i++){

        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.textContent = guess[i];

        if(guess[i] === secretWord[i]){
            tile.classList.add("correct");
        }
        else if(secretWord.includes(guess[i])){
            tile.classList.add("present");
        }
        else{
            tile.classList.add("absent");
        }

        board.appendChild(tile);
    }

    attempts++;

    if(guess === secretWord){
        message.textContent =
            "🎉 You guessed the word!";
        input.disabled = true;
        button.disabled = true;
        return;
    }

    if(attempts === maxAttempts){
        message.textContent =
            `Game Over! Word was ${secretWord}`;
        input.disabled = true;
        button.disabled = true;
    }

    input.value = "";
}