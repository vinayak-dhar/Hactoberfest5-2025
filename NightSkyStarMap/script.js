const form = document.getElementById("skyForm");
const canvas = document.getElementById("skyCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawConstellations() {
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  for(let i=0; i<10; i++){
    const x1 = Math.random() * canvas.width;
    const y1 = Math.random() * canvas.height;
    const x2 = Math.random() * canvas.width;
    const y2 = Math.random() * canvas.height;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  drawStars();
  drawConstellations();
  const city = document.getElementById("city").value;
  const date = document.getElementById("date").value;
  document.getElementById("resultText").innerText = `Your sky looked like this in ${city} on ${date}`;
});
