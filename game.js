let score = 0;
let gameStarted = false;
let gameTime = 30;
let timer = null;


// عناصر صفحه

const scoreElement =
    document.getElementById("score");

const statusElement =
    document.getElementById("status");


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
        "بازی شروع شد! سریع کلیک کن 🎮";


    timer = setInterval(function(){

        gameTime--;


        statusElement.textContent =
            "زمان باقی‌مانده: " +
            gameTime +
            " ثانیه";


        if(gameTime <= 0){

            clearInterval(timer);

            gameStarted = false;


            finishGame();

        }

    },1000);

}



// کلیک داخل بازی

function clickGame(){

    if(!gameStarted){
        return;
    }


    score++;


    updateScore();

}



// بروزرسانی امتیاز فعلی

function updateScore(){

    if(scoreElement){

        scoreElement.textContent =
            score;

    }

}



// پایان بازی

function finishGame(){

    statusElement.textContent =
        "⏰ بازی تمام شد! امتیاز: " +
        score;


    // امتیاز قبلی

    let totalScore =
        Number(
            localStorage.getItem("playerScore")
        ) || 0;


    // رکورد قبلی

    let record =
        Number(
            localStorage.getItem("playerRecord")
        ) || 0;


    // تعداد بازی قبلی

    let games =
        Number(
            localStorage.getItem("playerGames")
        ) || 0;



    // اضافه کردن امتیاز این بازی

    totalScore =
        totalScore + score;


    // افزایش تعداد بازی

    games++;


    // بررسی رکورد

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



// بروزرسانی اطلاعات بازیکن روی صفحه

function updatePlayerInfo(){

    const playerScore =
        document.getElementById("playerScore");


    const playerRecord =
        document.getElementById("playerRecord");


    const playerGames =
        document.getElementById("playerGames");



    if(playerScore){

        playerScore.textContent =
            localStorage.getItem("playerScore") || 0;

    }


    if(playerRecord){

        playerRecord.textContent =
            localStorage.getItem("playerRecord") || 0;

    }


    if(playerGames){

        playerGames.textContent =
            localStorage.getItem("playerGames") || 0;

    }

}



// دکمه اصلی بازی

function playGame(){

    if(!gameStarted){

        startGame();

        return;

    }


    clickGame();

}



// خرید PRO

function buyPro(){

    alert(
        "⭐ نسخه PRO به‌زودی فعال می‌شود."
    );

}



// در دسترس قرار دادن توابع برای HTML

window.playGame =
    playGame;

window.buyPro =
    buyPro;



// نمایش اطلاعات ذخیره‌شده هنگام باز شدن صفحه

document.addEventListener(
    "DOMContentLoaded",
    function(){

        updatePlayerInfo();

    }
);
