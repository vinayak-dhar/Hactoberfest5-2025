const input = document.getElementById('markdown-input');
const preview = document.getElementById('preview');

function renderMarkdown(text) {
  // Convert basic markdown to HTML
  let html = text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/\`(.*)\`/gim, '<code>$1</code>')
    .replace(/\n$/gim, '<br>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');

  return html;
}

input.addEventListener('input', () => {
  preview.innerHTML = renderMarkdown(input.value);
});
