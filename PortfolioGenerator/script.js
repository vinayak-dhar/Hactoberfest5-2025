function generatePortfolio() {
  const name = document.getElementById('name').value.trim();
  const bio = document.getElementById('bio').value.trim();
  const skills = document.getElementById('skills').value.trim().split(',');
  const linkedin = document.getElementById('linkedin').value.trim();
  const github = document.getElementById('github').value.trim();

  const preview = document.getElementById('portfolioPreview');
  preview.innerHTML = `
    <h3>${name}</h3>
    <p>${bio}</p>
    <p><strong>Skills:</strong> ${skills.map(s => s.trim()).join(', ')}</p>
    <p>
      <a href="${linkedin}" target="_blank">LinkedIn</a> |
      <a href="${github}" target="_blank">GitHub</a>
    </p>
  `;
}
