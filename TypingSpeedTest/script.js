const sampleTexts = [
  "Typing speed tests help improve your accuracy and speed.",
  "Practice makes perfect when learning to type fast.",
  "JavaScript is a powerful programming language for web development.",
  "Learning to type faster can significantly improve your productivity.",
  "Consistency is the key to becoming a faster typist.",
  "Focus on accuracy before trying to increase speed.",
  "The keyboard becomes easier to use with daily practice.",
  "A calm and steady pace leads to better results.",
  "Typing is a skill that grows with patience and effort.",
  "Keep your hands relaxed while typing for long periods.",
  "Accuracy always comes before speed in typing practice.",
  "Good posture helps prevent strain during long typing sessions.",
  "Typing practice helps build confidence and control.",
  "Challenge yourself to type without looking at the keyboard.",
  "Your brain learns faster through repetition and focus.",
  "The quick brown fox jumps over the lazy dog.",
  "Typing tests are a fun way to measure improvement.",
  "Even small progress each day makes a big difference.",
  "Stay relaxed and focused while you type each sentence.",
  "Use correct finger placement to improve typing efficiency.",
  "Muscle memory is the foundation of fast typing.",
  "Avoid unnecessary force when pressing the keys.",
  "Reading ahead helps you type more smoothly and quickly.",
  "The best typists type with rhythm and precision.",
  "Slow and steady typing builds lasting accuracy.",
  "Mistakes are part of learning and should not stop you.",
  "Regular breaks help keep your hands comfortable.",
  "Typing fluently improves both focus and coordination.",
  "A quiet environment helps improve concentration while typing.",
  "Speed comes naturally once accuracy is consistent.",
  "Typing fast is not about rushing but about rhythm.",
  "Confidence grows with each typing session you complete.",
  "Good lighting helps reduce eye strain while typing.",
  "Keep your wrists straight and your fingers light on the keys.",
  "Typing with proper technique prevents long term discomfort.",
  "Every sentence you type builds your typing ability.",
  "Practice with different texts to challenge your brain.",
  "Fast typing feels like music when you find your rhythm.",
  "Your typing speed improves faster with daily practice.",
  "Stay focused on one word at a time while typing.",
  "Typing challenges are great for testing your limits.",
  "Each keystroke brings you closer to mastery.",
  "Learning touch typing makes every task more efficient.",
  "Avoid distractions to maintain focus on your typing flow.",
  "Type naturally without forcing your hands to move quickly.",
  "A smooth typing style comes with consistent training.",
  "Every error you correct makes you more precise.",
  "Set goals and measure your progress regularly.",
  "Typing skills are valuable in every modern career.",
  "Keep typing and watch your speed grow over time.",
];

const textToType = document.getElementById("text-to-type");
const inputField = document.getElementById("input-field");
const startBtn = document.getElementById("start-btn");
const result = document.getElementById("result");
const realTimeStats = document.getElementById("real-time-stats");
const timerDisplay = document.getElementById("timer-display");

const testConfig = {
  duration: 60,
  autoEnd: true,
  allowIncomplete: true,
};

let currentText = "";
let startTime;
let testStarted = false;
let isTestRunning = false;
let testTimer;
let timerInterval;

let currentCharIndex = 0;
let totalCharsTyped = 0;
let errorsCount = 0;
let correctCharsCount = 0;

function startTest() {
  if (!testStarted) {
    currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];

    resetAllCounters();

    renderTextWithCharHighlighting();

    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();

    startTime = new Date();
    testStarted = true;
    isTestRunning = true;

    if (testConfig.autoEnd) {
      testTimer = setTimeout(() => {
        endTestByTime();
      }, testConfig.duration * 1000);
    }

    startBtn.textContent = "Reset";
    result.textContent = "";

    addTimerDisplay();

    updateRealTimeStats();
  } else {
    resetTest();
  }
}

function resetAllCounters() {
  currentCharIndex = 0;
  totalCharsTyped = 0;
  errorsCount = 0;
  correctCharsCount = 0;
}

function renderTextWithCharHighlighting() {
  let html = "";
  for (let i = 0; i < currentText.length; i++) {
    if (i === currentCharIndex) {
      html += `<span class="current-char">${currentText[i]}</span>`;
    } else if (i < currentCharIndex) {
      html += `<span class="typed-correct">${currentText[i]}</span>`;
    } else {
      html += `<span class="not-typed">${currentText[i]}</span>`;
    }
  }
  textToType.innerHTML = html;
}

function renderTextWithError() {
  let html = "";
  for (let i = 0; i < currentText.length; i++) {
    if (i === currentCharIndex) {
      html += `<span class="error-char">${currentText[i]}</span>`;
    } else if (i < currentCharIndex) {
      html += `<span class="typed-correct">${currentText[i]}</span>`;
    } else {
      html += `<span class="not-typed">${currentText[i]}</span>`;
    }
  }
  textToType.innerHTML = html;
}

function resetTest() {
  textToType.innerHTML =
    "Click 'Start' to begin. A random text will appear here.";
  inputField.value = "";
  inputField.disabled = true;
  startBtn.textContent = "Start";
  result.textContent = "";
  realTimeStats.textContent = "";

  if (testTimer) {
    clearTimeout(testTimer);
  }
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  const timerDisplayElement = document.getElementById("timer-display");
  if (timerDisplayElement) {
    timerDisplayElement.remove();
  }

  testStarted = false;
  isTestRunning = false;
  resetAllCounters();
}

function checkTyping(event) {
  if (!isTestRunning) return;

  const typedText = inputField.value;

  if (typedText.length > totalCharsTyped) {
    const newChar = typedText[typedText.length - 1];
    const expectedChar = currentText[currentCharIndex];

    totalCharsTyped++;

    if (newChar === expectedChar) {
      correctCharsCount++;
      currentCharIndex++;
      renderTextWithCharHighlighting();
    } else {
      errorsCount++;
      renderTextWithError();
    }

    updateRealTimeStats();

    if (currentCharIndex >= currentText.length) {
      endTest("Texto completo!");
    }
  } else if (typedText.length < totalCharsTyped) {
    totalCharsTyped--;
    if (totalCharsTyped < currentCharIndex) {
      currentCharIndex = totalCharsTyped;
      renderTextWithCharHighlighting();
      updateRealTimeStats();
    }
  }
}

function updateRealTimeStats() {
  const accuracy =
    totalCharsTyped > 0
      ? Math.round((correctCharsCount / totalCharsTyped) * 100)
      : 100;

  const wpm = calculateCurrentWPM();

  realTimeStats.innerHTML = `
    <div class="stats-container">
      <span class="stat-item">Precisão: <strong>${accuracy}%</strong></span>
      <span class="stat-item">Erros: <strong>${errorsCount}</strong></span>
      <span class="stat-item">WPM: <strong>${wpm}</strong></span>
      <span class="stat-item">Caracteres: <strong>${correctCharsCount}/${totalCharsTyped}</strong></span>
    </div>
  `;
}

function calculateCurrentWPM() {
  if (!startTime) return 0;

  const elapsed = (new Date() - startTime) / 1000;
  if (elapsed === 0) return 0;

  const wordsTyped = correctCharsCount / 5;
  const timeInMinutes = elapsed / 60;
  const wpm = Math.round(wordsTyped / timeInMinutes);

  return wpm;
}

function addTimerDisplay() {
  const timerDiv = document.createElement("div");
  timerDiv.id = "timer-display";
  timerDiv.className = "timer-display";

  const container = document.querySelector(".container");
  container.insertBefore(timerDiv, result);

  timerInterval = setInterval(() => {
    if (!isTestRunning) {
      clearInterval(timerInterval);
      return;
    }

    const elapsed = (new Date() - startTime) / 1000;
    const remaining = testConfig.duration - elapsed;

    if (remaining > 0) {
      timerDiv.innerHTML = `
        <div class="timer-circle">
          <span class="timer-text">${Math.ceil(remaining)}</span>
          <div class="timer-label">segundos restantes</div>
        </div>
      `;
    } else {
      timerDiv.innerHTML = '<div class="timer-finished">Tempo esgotado!</div>';
    }
  }, 1000);
}

function endTestByTime() {
  isTestRunning = false;
  clearTimeout(testTimer);
  endTest("Tempo esgotado!");
}

function endTest(reason = "Teste finalizado!") {
  isTestRunning = false;
  clearTimeout(testTimer);
  clearInterval(timerInterval);

  const endTime = new Date();
  const timeTaken = (endTime - startTime) / 1000;

  const wordsTyped = correctCharsCount / 5;
  const timeInMinutes = timeTaken / 60;
  const wpm = Math.round(wordsTyped / timeInMinutes);

  const accuracy =
    totalCharsTyped > 0
      ? Math.round((correctCharsCount / totalCharsTyped) * 100)
      : 0;

  let performanceLevel = "";
  let performanceColor = "";

  if (wpm >= 60) {
    performanceLevel = "Excelente!";
    performanceColor = "#28a745";
  } else if (wpm >= 40) {
    performanceLevel = "Bom!";
    performanceColor = "#17a2b8";
  } else if (wpm >= 25) {
    performanceLevel = "Regular";
    performanceColor = "#ffc107";
  } else {
    performanceLevel = "Precisa melhorar";
    performanceColor = "#dc3545";
  }

  result.innerHTML = `
    <div class="result-container">
      <h3>Resultado do Teste</h3>
      <div class="result-reason">${reason}</div>
      
      <div class="result-stats">
        <div class="stat-card">
          <div class="stat-value" style="color: #4CAF50;">${wpm}</div>
          <div class="stat-label">WPM</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value" style="color: #2196F3;">${accuracy}%</div>
          <div class="stat-label">Precisão</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value" style="color: #FF9800;">${timeTaken.toFixed(
            1
          )}s</div>
          <div class="stat-label">Tempo</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value" style="color: #9C27B0;">${correctCharsCount}</div>
          <div class="stat-label">Corretos</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-value" style="color: #dc3545;">${errorsCount}</div>
          <div class="stat-label">Erros</div>
        </div>
      </div>
      
      <div class="performance-level" style="color: ${performanceColor};">
        ${performanceLevel}
      </div>
    </div>
  `;

  inputField.disabled = true;
  testStarted = false;
  startBtn.textContent = "Start Again";

  const timerDisplayElement = document.getElementById("timer-display");
  if (timerDisplayElement) {
    timerDisplayElement.remove();
  }
}

startBtn.addEventListener("click", startTest);
inputField.addEventListener("input", checkTyping);

inputField.addEventListener("keydown", function (event) {
  if (isTestRunning) {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (event.key.length === 1) {
      return;
    }

    event.preventDefault();
  }
});
