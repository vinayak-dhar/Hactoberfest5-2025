const habitList = document.getElementById('habitList');

function addHabit() {
  const habitName = document.getElementById('habitName').value.trim();
  if (!habitName) return alert("Enter a habit!");

  const card = document.createElement('div');
  card.className = 'habit-card';

  const text = document.createElement('span');
  text.innerText = habitName;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onchange = () => updateProgress(card, checkbox.checked);

  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  const progress = document.createElement('div');
  progress.className = 'progress';
  progressBar.appendChild(progress);

  card.appendChild(text);
  card.appendChild(checkbox);
  card.appendChild(progressBar);

  habitList.appendChild(card);
  document.getElementById('habitName').value = '';
}

function updateProgress(card, checked) {
  const progress = card.querySelector('.progress');
  progress.style.width = checked ? '100%' : '0%';
}
