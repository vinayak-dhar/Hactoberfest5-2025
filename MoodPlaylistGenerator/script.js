const playlistEl = document.getElementById('playlist');

const moodPlaylists = {
  happy: [
    { title: "Happy Song 1", artist: "Artist A", img: "https://via.placeholder.com/150", link: "https://www.youtube.com" },
    { title: "Happy Song 2", artist: "Artist B", img: "https://via.placeholder.com/150", link: "https://www.youtube.com" },
    { title: "Happy Song 3", artist: "Artist C", img: "https://via.placeholder.com/150", link: "https://www.youtube.com" }
  ],
  sad: [
    { title: "Sad Song 1", artist: "Artist D", img: "https://via.placeholder.com/150", link: "https://www.youtube.com" },
    { title: "Sad Song 2", artist: "Artist E", img: "https://via.placeholder.com/150", link: "https://www.youtube.com" }
  ],
  chill: [
    { title: "Chill Song 1", artist: "Artist F", img: "https://via.placeholder.com/150", link: "https://www.youtube.com" },
    { title: "Chill Song 2", artist: "Artist G", img: "https://via.placeholder.com/150", link: "https://www.youtube.com" }
  ],
  energetic: [
    { title: "Energetic Song 1", artist: "Artist H", img: "https://via.placeholder.com/150", link: "https://www.youtube.com" },
    { title: "Energetic Song 2", artist: "Artist I", img: "https://via.placeholder.com/150", link: "https://www.youtube.com" }
  ]
};

function generatePlaylist(mood) {
  playlistEl.innerHTML = '';
  const songs = moodPlaylists[mood];
  songs.forEach(song => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
      <img src="${song.img}" alt="${song.title}">
      <a href="${song.link}" target="_blank">${song.title}</a>
      <p>${song.artist}</p>
    `;
    playlistEl.appendChild(card);
  });
}
