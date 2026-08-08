// player.js

const player = {
    name: localStorage.getItem("playerName") || "بازیکن",
    score: Number(localStorage.getItem("playerScore")) || 0,
    record: Number(localStorage.getItem("playerRecord")) || 0,
    games: Number(localStorage.getItem("playerGames")) || 0
};

// نمایش اطلاعات بازیکن
function showPlayerInfo() {

    const nameElement = document.getElementById("playerName");
    const scoreElement = document.getElementById("playerScore");
    const recordElement = document.getElementById("playerRecord");
    const gamesElement = document.getElementById("playerGames");

    if (nameElement) {
        nameElement.textContent = player.name;
    }

    if (scoreElement) {
        scoreElement.textContent = player.score;
    }

    if (recordElement) {
        recordElement.textContent = player.record;
    }

    if (gamesElement) {
        gamesElement.textContent = player.games;
    }
}

// اجرای خودکار
document.addEventListener("DOMContentLoaded", showPlayerInfo);
