/*
PLAYER SYSTEM
ذخیره بازیکن، امتیاز و رکورد
*/

const PLAYER_KEY = "gamePlayer";

let player = {
name: "بازیکن",
score: 0,
bestScore: 0,
gamesPlayed: 0
};

/* =========================
بارگذاری اطلاعات بازیکن
========================= */

function loadPlayer(){

const saved =
    localStorage.getItem(PLAYER_KEY);

if(saved){

    try{

        player = {
            ...player,
            ...JSON.parse(saved)
        };

    }catch(error){

        console.log(
            "اطلاعات بازیکن قابل خواندن نیست."
        );
    }
}

updatePlayerUI();

}

/* =========================
ذخیره اطلاعات
========================= */

function savePlayer(){

localStorage.setItem(
    PLAYER_KEY,
    JSON.stringify(player)
);

}

/* =========================
ثبت امتیاز
========================= */

function addScore(points = 1){

player.score += points;

if(player.score > player.bestScore){

    player.bestScore =
        player.score;
}

savePlayer();

updatePlayerUI();

}

/* =========================
پایان بازی
========================= */

function finishGame(){

player.gamesPlayed++;

if(player.score > player.bestScore){

    player.bestScore =
        player.score;
}

savePlayer();

updatePlayerUI();

}

/* =========================
شروع بازی جدید
========================= */

function resetScore(){

player.score = 0;

savePlayer();

updatePlayerUI();

}

/* =========================
تغییر نام بازیکن
========================= */

function setPlayerName(name){

if(!name){
    return;
}

name = name.trim();

if(name.length === 0){
    return;
}

if(name.length > 20){

    name = name.substring(0,20);
}

player.name = name;

savePlayer();

updatePlayerUI();

}

/* =========================
نمایش اطلاعات
========================= */

function updatePlayerUI(){

const nameElement =
    document.getElementById("playerName");

const scoreElement =
    document.getElementById("playerScore");

const bestElement =
    document.getElementById("bestScore");

const gamesElement =
    document.getElementById("gamesPlayed");


if(nameElement){
    nameElement.textContent =
        player.name;
}

if(scoreElement){
    scoreElement.textContent =
        player.score;
}

if(bestElement){
    bestElement.textContent =
        player.bestScore;
}

if(gamesElement){
    gamesElement.textContent =
        player.gamesPlayed;
}

}

/* =========================
دریافت اطلاعات بازیکن
========================= */

function getPlayer(){

return player;

}

/* =========================
اجرای اولیه
========================= */

document.addEventListener(
"DOMContentLoaded",
function(){

    loadPlayer();

}

);

/* =========================
دسترسی از فایل‌های دیگر
========================= */

window.loadPlayer = loadPlayer;
window.savePlayer = savePlayer;
window.addScore = addScore;
window.finishGame = finishGame;
window.resetScore = resetScore;
window.setPlayerName = setPlayerName;
window.getPlayer = getPlayer;
