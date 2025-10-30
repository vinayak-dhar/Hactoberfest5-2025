import { useState } from "react";
import Profile from "./components/Profile";
import RepoList from "./components/RepoList";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleSearch = async () => {
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userJson = await userResponse.json();
    setUserData(userJson);

    const repoResponse = await fetch(userJson.repos_url);
    const repoJson = await repoResponse.json();
    setRepos(repoJson);
  };

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1>GitHub Profile Viewer</h1>
      <input type="text" placeholder="Enter GitHub username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {userData && <Profile user={userData} />}
      {repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
}

export default App;
