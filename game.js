let score = 0;
let gameStarted = false;
let gameTime = 30;
let timer = null;

const scoreElement =
    document.getElementById("score");

const statusElement =
    document.getElementById("status");

const targetElement =
    document.getElementById("target");

const gameAreaElement =
    document.getElementById("gameArea");

const playButtonElement =
    document.getElementById("playButton");


// شروع بازی

function startGame(){

    if(gameStarted){
        return;
    }

    gameStarted = true;

    score = 0;

    gameTime = 30;

    updateScore();

    statusElement.textContent =
        "🎯 هدف را سریع بزن!";

    playButtonElement.textContent =
        "🎯 بازی در حال اجرا";

    showTarget();


    timer = setInterval(function(){

        gameTime--;


        statusElement.textContent =
            "⏱️ زمان باقی‌مانده: " +
            gameTime +
            " ثانیه";


        if(gameTime <= 0){

            finishGame();

        }

    },1000);

}



// نمایش هدف در جای تصادفی

function showTarget(){

    if(!gameStarted){
        return;
    }


    const areaWidth =
        gameAreaElement.clientWidth;

    const areaHeight =
        gameAreaElement.clientHeight;


    const targetSize =
        targetElement.offsetWidth;


    const margin =
        targetSize / 2 + 5;


    const x =
        Math.random() *
        (areaWidth - margin * 2)
        + margin;


    const y =
        Math.random() *
        (areaHeight - margin * 2)
        + margin;


    targetElement.style.left =
        x + "px";


    targetElement.style.top =
        y + "px";


    targetElement.style.display =
        "block";

}



// زدن هدف

function hitTarget(){

    if(!gameStarted){
        return;
    }


    score++;


    updateScore();


    showTarget();

}



// بروزرسانی امتیاز

function updateScore(){

    if(scoreElement){

        scoreElement.textContent =
            score;

    }

}



// پایان بازی

function finishGame(){

    if(!gameStarted){
        return;
    }


    clearInterval(timer);

    timer = null;

    gameStarted = false;


    if(targetElement){

        targetElement.style.display =
            "none";

    }


    if(playButtonElement){

        playButtonElement.textContent =
            "🎮 دوباره بازی کن";

    }


    statusElement.textContent =
        "⏰ بازی تمام شد! امتیاز: " +
        score;



    // اطلاعات قبلی بازیکن

    let totalScore =
        Number(
            localStorage.getItem("playerScore")
        ) || 0;


    let record =
        Number(
            localStorage.getItem("playerRecord")
        ) || 0;


    let games =
        Number(
            localStorage.getItem("playerGames")
        ) || 0;



    // اضافه کردن امتیاز این بازی

    totalScore += score;


    // افزایش تعداد بازی

    games++;


    // ثبت رکورد

    if(score > record){

        record = score;

    }



    // ذخیره اطلاعات

    localStorage.setItem(
        "playerScore",
        totalScore
    );


    localStorage.setItem(
        "playerRecord",
        record
    );


    localStorage.setItem(
        "playerGames",
        games
    );


    // نمایش اطلاعات جدید

    updatePlayerInfo();

}



// بروزرسانی اطلاعات بازیکن

function updatePlayerInfo(){

    const playerScore =
        document.getElementById("playerScore");


    const playerRecord =
        document.getElementById("playerRecord");


    const playerGames =
        document.getElementById("playerGames");



    if(playerScore){

        playerScore.textContent =
            localStorage.getItem(
                "playerScore"
            ) || 0;

    }


    if(playerRecord){

        playerRecord.textContent =
            localStorage.getItem(
                "playerRecord"
            ) || 0;

    }


    if(playerGames){

        playerGames.textContent =
            localStorage.getItem(
                "playerGames"
            ) || 0;

    }

}



// دکمه شروع بازی

function playGame(){

    if(!gameStarted){

        startGame();

        return;

    }

}



// خرید PRO

function buyPro(){

    alert(
        "⭐ نسخه PRO به‌زودی فعال می‌شود."
    );

}



// اتصال توابع به HTML

window.playGame =
    playGame;

window.hitTarget =
    hitTarget;

window.buyPro =
    buyPro;



// نمایش اطلاعات ذخیره‌شده

document.addEventListener(
    "DOMContentLoaded",
    function(){

        updatePlayerInfo();

    }
);
