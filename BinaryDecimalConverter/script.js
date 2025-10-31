document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('inputValue');
  const convertBtn = document.getElementById('convertBtn');
  const clearBtn = document.getElementById('clearBtn');
  const outputEl = document.getElementById('output');
  const outputCard = document.getElementById('outputCard');
  const errorEl = document.getElementById('error');
  const helper = document.getElementById('helper');
  const copyBtn = document.getElementById('copyBtn');
  const modeBinToDec = document.getElementById('modeBinToDec');
  const modeDecToBin = document.getElementById('modeDecToBin');

  let mode = 'bin-to-dec';

  function setMode(m) {
    mode = m;
    if (mode === 'bin-to-dec') {
      modeBinToDec.classList.add('active');
      modeDecToBin.classList.remove('active');
      modeBinToDec.setAttribute('aria-pressed', 'true');
      modeDecToBin.setAttribute('aria-pressed', 'false');
      helper.innerText = 'Enter a binary string (only 0 and 1).';
      input.placeholder = 'e.g. 1011';
    } else {
      modeDecToBin.classList.add('active');
      modeBinToDec.classList.remove('active');
      modeDecToBin.setAttribute('aria-pressed', 'true');
      modeBinToDec.setAttribute('aria-pressed', 'false');
      helper.innerText = 'Enter a non-negative integer (decimal).';
      input.placeholder = 'e.g. 13';
    }
    clearFeedback();
  }

  function showError(msg) {
    errorEl.textContent = msg;
    outputCard.hidden = true;
  }

  function clearFeedback() {
    errorEl.textContent = '';
    outputEl.textContent = '';
    outputCard.hidden = true;
  }

  function convert() {
    const value = input.value.trim();
    clearFeedback();
    if (!value) {
      showError('Please enter a value to convert.');
      return;
    }

    if (mode === 'bin-to-dec') {
      if (!/^[01]+$/.test(value)) {
        showError('Invalid binary. Only digits 0 and 1 are allowed.');
        return;
      }
      const decimal = parseInt(value, 2);
      outputEl.textContent = `Decimal: ${decimal}`;
    } else {
      // decimal -> binary
      if (!/^\d+$/.test(value)) {
        showError('Invalid decimal. Enter a non-negative integer.');
        return;
      }
      const num = Number(value);
      const binary = num.toString(2);
      outputEl.textContent = `Binary: ${binary}`;
    }

    outputCard.hidden = false;
  }

  function copyResult() {
    const text = outputEl.textContent || '';
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      copyBtn.textContent = 'Copied';
      setTimeout(() => (copyBtn.textContent = 'Copy'), 1400);
    }).catch(() => {
      // fallback
      copyBtn.textContent = 'Copy';
    });
  }

  function clearAll() {
    input.value = '';
    clearFeedback();
    input.focus();
  }

  // initial mode
  setMode(mode);

  // events
  modeBinToDec.addEventListener('click', () => setMode('bin-to-dec'));
  modeDecToBin.addEventListener('click', () => setMode('dec-to-bin'));
  convertBtn.addEventListener('click', convert);
  clearBtn.addEventListener('click', clearAll);
  copyBtn.addEventListener('click', copyResult);

  // Enter to convert
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') convert();
  });
});
