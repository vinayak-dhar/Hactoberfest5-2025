function generatePassword() {
  const len = +document.getElementById('length').value;
  const sets = { upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', lower: 'abcdefghijklmnopqrstuvwxyz', num: '0123456789', sym: '!@#$%^&*()_+[]{}|;:,.<>?' };
  const use = {
    upper: document.getElementById('uppercase').checked,
    lower: document.getElementById('lowercase').checked,
    num: document.getElementById('numbers').checked,
    sym: document.getElementById('symbols').checked
  };

  if (!Object.values(use).some(v => v)) {
    alert('Select at least one option!');
    return;
  }

  let chars = '';
  for (const [k, v] of Object.entries(use)) if (v) chars += sets[k];

  let pwd = '';
  for (let i = 0; i < len; i++) pwd += chars[Math.floor(Math.random() * chars.length)];

  document.getElementById('password').textContent = pwd;
  updateMeter(len, Object.values(use).filter(Boolean).length);
}

function updateMeter(len, types) {
  let score = 0;
  if (len >= 8) score++;
  if (len >= 12) score++;
  if (len >= 16) score++;
  if (types >= 3) score++;
  if (types >= 4) score++;

  const levels = [
    ['20%', '#ff4444', 'Very Weak'],
    ['40%', '#ff8800', 'Weak'],
    ['60%', '#ffbb33', 'Medium'],
    ['80%', '#99cc00', 'Strong'],
    ['100%', '#33b679', 'Very Strong']
  ];
  const [w, c, l] = levels[Math.min(score, 4)];
  document.getElementById('bar').style.width = w;
  document.getElementById('bar').style.background = c;
  document.getElementById('text').textContent = l;
}

function copyPassword() {
  const pwd = document.getElementById('password').textContent;
  if (!pwd) return;
  navigator.clipboard.writeText(pwd).then(() => alert('Copied!'));
}