document.getElementById("participantForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const college = document.getElementById("college").value.trim();

  if (name && college) {
    const participant = { name, college };

    // Get current data
    const participants = JSON.parse(localStorage.getItem("participants")) || [];

    // Add new participant
    participants.push(participant);

    // Save back to localStorage
    localStorage.setItem("participants", JSON.stringify(participants));

    // Update display
    displayParticipants();

    // Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("college").value = "";
  }
});

function displayParticipants() {
  const list = document.getElementById("participantList");
  const participants = JSON.parse(localStorage.getItem("participants")) || [];

  list.innerHTML = participants.map(
    (p) => `<tr><td>${p.name}</td><td>${p.college}</td></tr>`
  ).join("");
}

// Show existing participants on load
displayParticipants();
