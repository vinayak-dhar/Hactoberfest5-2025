function shortenUrl() {
  const longUrl = document.getElementById("longUrlInput").value;

  if (!longUrl) {
    alert("Please enter a URL");
    return;
  }


  const code = Math.random().toString(36).substring(2, 8);


  localStorage.setItem(code, longUrl);

  const shortUrl = `${window.location.origin}?${code}`;

  document.getElementById("result").innerHTML = `
    Short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a>
  `;

  document.getElementById("longUrlInput").value = "";
}


window.onload = () => {
  const code = window.location.search.slice(1);

  if (code) {
    const longUrl = localStorage.getItem(code);
    if (longUrl) {
      window.location.href = longUrl;
    }
  }
}
