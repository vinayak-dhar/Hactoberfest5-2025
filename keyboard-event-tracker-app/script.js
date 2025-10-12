const userInput = document.querySelector('#userInput');
const keyPressedOutput = document.querySelector('.keyPressed span');
const keyCodeOutput = document.querySelector('.keyCode span');
const charCodeOutput = document.querySelector('.charCode span');
const eventType = document.querySelector('.eventType span');

const handleKeyEvent = (e) => {
  keyPressedOutput.innerText = e.key;
  keyCodeOutput.innerText = e.code;
  charCodeOutput.innerText = e.key.charCodeAt(0);
  eventType.innerText = e.type;

  if (userInput.value === '') {
    keyPressedOutput.innerText = '';
    keyCodeOutput.innerText = '';
    charCodeOutput.innerText = '';
    eventType.innerText = '';
  }
};
userInput.addEventListener('keydown', handleKeyEvent);
userInput.addEventListener('keypress', handleKeyEvent);
userInput.addEventListener('keyup', handleKeyEvent);
