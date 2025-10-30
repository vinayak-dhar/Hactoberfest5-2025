import React from "react";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

export default function Profile({ user }) {
  if (!user) return null;
  return (
    <div className="profile-card card">
      <div className="profile-top">
        <img src={user.avatar_url} alt={`${user.login} avatar`} className="avatar" />
        <div className="profile-info">
          <h2 className="name">{user.name || user.login}</h2>
          <div className="meta">@{user.login}</div>
        </div>
      </div>

      {user.bio && <p className="bio">{user.bio}</p>}

      <div className="profile-stats">
        <div><strong>{user.followers}</strong><span>Followers</span></div>
        <div><strong>{user.following}</strong><span>Following</span></div>
        <div><strong>{user.public_repos}</strong><span>Repos</span></div>
      </div>

      <ul className="profile-details">
        {user.location && <li><svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.999 2.5 2.5 0 0 1 12 11.5z"/></svg> {user.location}</li>}
        {user.blog && <li><svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M3.9 12a5 5 0 0 0 0 7.1l1.4-1.4a3 3 0 0 1 0-4.2l-1.4-1.5zm16.2 0l-1.4 1.5a3 3 0 0 1 0 4.2l1.4 1.4a5 5 0 0 0 0-7.1zM8.5 15.5l7-7 1.4 1.4-7 7L8.5 15.5z"/></svg> <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer">{user.blog}</a></li>}
        {user.twitter_username && <li><svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M22 5.92c-.64.28-1.33.46-2.05.55a3.53 3.53 0 0 0 1.55-1.94c-.68.4-1.43.7-2.23.86A3.51 3.51 0 0 0 12.77 8c0 .28.03.55.09.81A9.98 9.98 0 0 1 3.12 6.16a3.5 3.5 0 0 0 1.09 4.68c-.54 0-1.05-.16-1.5-.4v.04c0 1.69 1.2 3.1 2.78 3.42-.3.08-.6.12-.92.12-.23 0-.45-.02-.67-.06.46 1.42 1.8 2.45 3.39 2.48A7.05 7.05 0 0 1 2 19.54a9.9 9.9 0 0 0 5.38 1.57c6.45 0 9.98-5.35 9.98-9.99v-.45c.7-.52 1.3-1.17 1.78-1.92-.64.28-1.33.46-2.05.55z"/></svg> <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">@{user.twitter_username}</a></li>}
        {user.created_at && <li><svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10h5v5H7z" opacity=".3"/><path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H5V9h14v9z"/></svg> Joined {formatDate(user.created_at)}</li>}
      </ul>
    </div>
  );
}
