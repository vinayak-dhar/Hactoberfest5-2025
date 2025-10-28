// Selected buttons and icons
const rockBtn = document.querySelector('.rock-btn');
const paperBtn = document.querySelector('.paper-btn');
const scissorBtn = document.querySelector('.scissors-btn');
const userHandIcon = document.querySelector('.user.hand-icon');
const computerHandIcon = document.querySelector('.computer.hand-icon');
const result = document.querySelector('.result');
const userScore = document.querySelector('.user-score');
const computerScore = document.querySelector('.computer-score');
const handsIcons = document.querySelectorAll('.hand-icon');
const gameButtons = document.querySelectorAll(
  '.rock-btn, .paper-btn, .scissors-btn'
);

// PopupOverlay
const popupOverlay = document.querySelector('.popup-overlay');
const popupTitle = document.querySelector('.popup-title');
const popupCloseBtn = document.querySelector('.popup-close-btn');

// Audio Elements
const clickSound = document.querySelector('.click-sound');
const shakeSound = document.querySelector('.shake-sound');
const winSound = document.querySelector('.win-sound');
const loseSound = document.querySelector('.lose-sound');

// Icons
const rockIcon = '✊';
const paperIcon = '🤚';
const scissorIcon = '✌️';

// play sound
function playSound(sound) {
  sound.currentTime = 0; // Reset to start so it can
  sound.play(); // Play the sound
}

// Computer Choice Array
const iconList = [rockIcon, paperIcon, scissorIcon];

/* --- NEW: robust move normalization + deterministic winner logic --- */
const moveList = ['rock', 'paper', 'scissors'];
const iconByMove = { rock: rockIcon, paper: paperIcon, scissors: scissorIcon };

function normalizeMoveRaw(input) {
  if (input === undefined || input === null) return null;
  const s = String(input).trim().toLowerCase();
  if (s === '') return null;
  if (s === 'rock' || s === 'r' || s === '0') return 0;
  if (s === 'paper' || s === 'p' || s === '1') return 1;
  if (s === 'scissors' || s === 'scissor' || s === 's' || s === '2') return 2;
  const n = Number(s);
  if (!Number.isNaN(n) && (n === 0 || n === 1 || n === 2)) return n;
  return null;
}

/**
 * Returns:
 *  0 => tie
 *  1 => player A wins
 *  2 => player B wins
 */
function determineWinner(moveA, moveB) {
  const a = normalizeMoveRaw(moveA);
  const b = normalizeMoveRaw(moveB);
  if (a === null || b === null) {
    throw new Error('determineWinner: invalid move (accepted: rock/paper/scissors or r/p/s or 0/1/2)');
  }
  if (a === b) return 0;
  return (((a - b + 3) % 3) === 1) ? 1 : 2;
}
// expose for tests or other scripts
window.determineWinner = determineWinner;
window.normalizeMoveRaw = normalizeMoveRaw;

/* --- UPDATED: calculateResult now uses move names and determineWinner --- */
function calculateResult(playerMove) {
  // show initial "shaking" state
  userHandIcon.innerText = '🤜';
  computerHandIcon.innerText = '🤛';
  result.innerText = '🙄';

  // start shake animation
  userHandIcon.classList.add('shakeUserHands');
  computerHandIcon.classList.add('shakeComputerHands');

  setTimeout(() => {
    userHandIcon.classList.remove('shakeUserHands');
    computerHandIcon.classList.remove('shakeComputerHands');

    // show user choice icon
    const playerIcon = iconByMove[playerMove] || rockIcon;
    userHandIcon.innerText = playerIcon;

    // computer random move
    const computerIndex = Math.floor(Math.random() * 3);
    const computerMove = moveList[computerIndex];
    computerHandIcon.innerText = iconByMove[computerMove];

    // determine winner using deterministic logic
    let winner;
    try {
      winner = determineWinner(playerMove, computerMove);
    } catch (e) {
      result.innerText = 'Invalid move';
      console.error(e);
      return;
    }

    if (winner === 0) {
      result.innerText = 'Draw';
    } else if (winner === 1) {
      result.innerText = 'You won!!';
      userScore.innerText = parseInt(userScore.innerText, 10) + 1;
    } else {
      result.innerText = 'Sandeep Won!!';
      computerScore.innerText = parseInt(computerScore.innerText, 10) + 1;
    }

    checkScore();
  }, 3000);
}

// check score
function checkScore() {
  const userScoreValue = parseInt(userScore.textContent, 10);
  const computerScoreValue = parseInt(computerScore.textContent, 10);
  if (userScoreValue === 3) {
    // show popup
    showPopup('You Wins! 🎉');
    playSound(winSound);
  } else if (computerScoreValue === 3) {
    // show popup
    showPopup('Sandeep Wins! 😒');
    playSound(loseSound);
  }
}
function showPopup(message) {
  popupTitle.textContent = message;
  popupOverlay.classList.add('active');
}
function hidePopup() {
  popupOverlay.classList.remove('active');
}
function resetGame() {
  userScore.textContent = '0';
  computerScore.textContent = '0';
  hidePopup();
}
popupCloseBtn.addEventListener('click', resetGame);

handsIcons.forEach((hand) => {
  hand.addEventListener('animationstart', () => {
    playSound(shakeSound); // Play shake sound
  });
});

gameButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    playSound(clickSound); // Play click sound
  });
});

// updated event listeners to pass moves (not icons)
rockBtn.addEventListener('click', () => {
  calculateResult('rock');
});
paperBtn.addEventListener('click', () => {
  calculateResult('paper');
});
scissorBtn.addEventListener('click', () => {
  calculateResult('scissors');
});
