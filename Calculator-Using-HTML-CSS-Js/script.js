const display = document.getElementById("display");
const calcContainer = document.getElementById("calcContainer");
const openBtn = document.getElementById("openBtn");
const intro = document.getElementById("intro");

function addChar(char) {
  display.value += char;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function evaluateExpr() {
  try {
    let expr = display.value.replace(/×/g, "*").replace(/÷/g, "/").replace(/%/g, "/100");
    display.value = eval(expr);
  } catch {
    alert("Invalid Expression");
  }
}

openBtn.addEventListener("click", () => {
  intro.style.display = "none";
  calcContainer.classList.add("active");
});
