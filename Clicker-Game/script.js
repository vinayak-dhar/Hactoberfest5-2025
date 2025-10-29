// Simple Timed Clicker Game
const clickBtn = document.getElementById('clickBtn');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const bestEl = document.getElementById('best');
const durationSel = document.getElementById('duration');
const message = document.getElementById('message');

let duration = parseInt(durationSel.value, 10);
let timeLeft = duration;
let score = 0;
let best = Number(localStorage.getItem('timedClickerBest') || 0);
let timer = null;
let running = false;

bestEl.textContent = best;

// update displayed time/score
function updateHUD() {
  timeEl.textContent = timeLeft;
  scoreEl.textContent = score;
  bestEl.textContent = best;
}

// start or restart the round
function startGame() {
  if (running) return;
  duration = parseInt(durationSel.value, 10);
  timeLeft = duration;
  score = 0;
  running = true;
  message.textContent = 'Go! Click as fast as you can!';
  updateHUD();

  // start timer
  timer = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) endGame();
    updateHUD();
  }, 1000);
}

// end round
function endGame() {
  clearInterval(timer);
  running = false;
  message.textContent = `Time's up! You scored ${score} clicks.`;
  if (score > best) {
    best = score;
    localStorage.setItem('timedClickerBest', best);
    message.textContent += ' 🎉 New best!';
  }
  updateHUD();
}

// click handler
function handleClick() {
  if (!running) {
    // small hint: allow clicking to start optionally:
    message.textContent = 'Press Start to begin or click Start button.';
    return;
  }
  score += 1;

  // small visual click effect
  clickBtn.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(0.96)' },
    { transform: 'scale(1)' }
  ], { duration: 120, easing: 'ease' });

  updateHUD();
}

// reset best score
function resetBest() {
  if (!confirm('Reset best score?')) return;
  best = 0;
  localStorage.removeItem('timedClickerBest');
  updateHUD();
  message.textContent = 'Best score reset.';
}

// keyboard: space increases when running
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    handleClick();
  }
});

// wire events
clickBtn.addEventListener('click', (e) => {
  handleClick();
});

startBtn.addEventListener('click', () => {
  startGame();
});

resetBtn.addEventListener('click', resetBest);

// change duration while idle
durationSel.addEventListener('change', () => {
  if (!running) {
    duration = parseInt(durationSel.value, 10);
    timeLeft = duration;
    updateHUD();
  }
});

// initial HUD
updateHUD();
message.textContent = 'Choose duration and press Start.';
