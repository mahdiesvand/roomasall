let score = 0;
let gameStarted = false;
let gameTime = 30;
let timer = null;

const scoreElement = document.getElementById("score");
const statusElement = document.getElementById("status");

function startGame(){

if(gameStarted){
    return;
}

gameStarted = true;
score = 0;
gameTime = 30;

updateScore();

statusElement.textContent =
    "بازی شروع شد! سریع کلیک کن 🎮";

timer = setInterval(function(){

    gameTime--;

    statusElement.textContent =
        "زمان باقی‌مانده: " + gameTime + " ثانیه";

    if(gameTime <= 0){

        clearInterval(timer);

        gameStarted = false;

        statusElement.textContent =
            "⏰ بازی تمام شد! امتیاز: " + score;
    }

},1000);

}

function clickGame(){

if(!gameStarted){
    return;
}

score++;

updateScore();

}

function updateScore(){

if(scoreElement){
    scoreElement.textContent = score;
}

}

function playGame(){

if(!gameStarted){

    startGame();

    return;
}

clickGame();

}

function buyPro(){

alert(
    "⭐ نسخه PRO به‌زودی فعال می‌شود."
);

}

window.playGame = playGame;
window.buyPro = buyPro;
