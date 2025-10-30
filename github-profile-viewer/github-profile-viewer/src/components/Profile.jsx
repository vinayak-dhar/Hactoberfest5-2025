import React from "react";

export default function Profile({ user }) {
  return (
    <div className="card">
      <img src={user.avatar_url} width={120} style={{ borderRadius: "50%" }} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <p>Followers: {user.followers} | Following: {user.following}</p>
      <p>Public Repos: {user.public_repos}</p>
    </div>
  );
}
