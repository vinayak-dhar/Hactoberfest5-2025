const moods = {
  happy: {
    bg: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    quote: "Smile, it's contagious! 😊"
  },
  sad: {
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    quote: "It's okay to feel blue sometimes. 💙"
  },
  calm: {
    bg: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    quote: "Breathe in peace, breathe out chaos. 🌿"
  },
  excited: {
    bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    quote: "The world is yours to conquer! 🔥"
  }
};

document.querySelectorAll(".mood").forEach(button => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;
    document.body.style.background = moods[mood].bg;
    document.getElementById("quote").textContent = moods[mood].quote;
  });
});
