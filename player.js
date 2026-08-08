/* =====================================
   ASAL GAME - PLAYER SYSTEM
   ===================================== */


/* دریافت اطلاعات بازیکن */

function getPlayerName(){

    return localStorage.getItem(
        "playerName"
    ) || "";

}


/* تعداد بازی‌ها */

function getGamesCount(){

    return Number(
        localStorage.getItem(
            "gamesCount"
        ) || 0
    );

}


/* امتیاز کل */

function getTotalScore(){

    return Number(
        localStorage.getItem(
            "totalScore"
        ) || 0
    );

}


/* رکورد */

function getRecordScore(){

    return Number(
        localStorage.getItem(
            "recordScore"
        ) || 0
    );

}


/* افزایش تعداد بازی */

function addGame(){

    const count =
        getGamesCount() + 1;

    localStorage.setItem(
        "gamesCount",
        count
    );

    updatePlayerDisplay();

}


/* اضافه کردن امتیاز */

function addScore(score){

    score = Number(score) || 0;


    const total =
        getTotalScore() + score;


    localStorage.setItem(
        "totalScore",
        total
    );


    /* بررسی رکورد */

    if(
        score >
        getRecordScore()
    ){

        localStorage.setItem(
            "recordScore",
            score
        );

    }


    updatePlayerDisplay();

}


/* دریافت اطلاعات کامل */

function getPlayerData(){

    return {

        name: getPlayerName(),

        games: getGamesCount(),

        score: getTotalScore(),

        record: getRecordScore()

    };

}


/* نمایش اطلاعات روی صفحه */

function updatePlayerDisplay(){

    const name =
        document.getElementById(
            "playerNameDisplay"
        );

    const games =
        document.getElementById(
            "gamesCount"
        );

    const score =
        document.getElementById(
            "totalScore"
        );

    const record =
        document.getElementById(
            "recordScore"
        );


    if(name){

        name.textContent =
            getPlayerName();

    }


    if(games){

        games.textContent =
            getGamesCount();

    }


    if(score){

        score.textContent =
            getTotalScore();

    }


    if(record){

        record.textContent =
            getRecordScore();

    }

}


/* آماده‌سازی اطلاعات بازیکن */

function initPlayer(){

    if(
        !localStorage.getItem(
            "gamesCount"
        )
    ){

        localStorage.setItem(
            "gamesCount",
            "0"
        );

    }


    if(
        !localStorage.getItem(
            "totalScore"
        )
    ){

        localStorage.setItem(
            "totalScore",
            "0"
        );

    }


    if(
        !localStorage.getItem(
            "recordScore"
        )
    ){

        localStorage.setItem(
            "recordScore",
            "0"
        );

    }


    updatePlayerDisplay();

}


/* اجرای سیستم بازیکن */

document.addEventListener(
    "DOMContentLoaded",
    initPlayer
);
