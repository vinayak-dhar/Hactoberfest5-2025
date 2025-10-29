const basket = document.querySelector(".basket");
const egg = document.querySelector(".egg");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const restartBtn = document.getElementById("restart");

let basketX = 160;
let eggY = 0;
let eggX = Math.random() * 370;
let score = 0;
let lives = 3;
let speed = 2;
let gameInterval;

function moveBasket(e) {
  if (e.key === "ArrowLeft" && basketX > 0) basketX -= 20;
  if (e.key === "ArrowRight" && basketX < 320) basketX += 20;
  basket.style.left = basketX + "px";
}

function dropEgg() {
  eggY += speed;
  egg.style.top = eggY + "px";
  egg.style.left = eggX + "px";

  // Collision detection
  if (eggY > 460 && eggX > basketX - 20 && eggX < basketX + 80) {
    score++;
    scoreDisplay.textContent = score;
    resetEgg();
    speed += 0.3;
  }

  // Missed egg
  if (eggY > 500) {
    lives--;
    livesDisplay.textContent = lives;
    resetEgg();
    if (lives === 0) endGame();
  }
}

function resetEgg() {
  eggY = 0;
  eggX = Math.random() * 370;
}

function startGame() {
  gameInterval = setInterval(dropEgg, 20);
  document.addEventListener("keydown", moveBasket);
}

function endGame() {
  clearInterval(gameInterval);
  alert("Game Over! Your score: " + score);
}

restartBtn.addEventListener("click", () => {
  clearInterval(gameInterval);
  score = 0;
  lives = 3;
  speed = 2;
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  eggY = 0;
  eggX = Math.random() * 370;
  startGame();
});

startGame();
