import { useState, useEffect, useCallback, useRef } from "react";
import Profile from "./components/Profile";
import RepoList from "./components/RepoList";
import "./App.css";

const REPOS_PER_PAGE = 30;

function App() {
  // theme: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('gh_theme') || 'dark';
    } catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('gh_theme', theme); } catch {}
  }, [theme]);

  const [username, setUsername] = useState("");
  const [query, setQuery] = useState(""); // last searched username
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const inputRef = useRef(null);

  // Fetch user profile
  const fetchUser = useCallback(async (u) => {
    setError("");
    setLoadingUser(true);
    setUserData(null);
    try {
      const res = await fetch(`https://api.github.com/users/${u}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("User not found");
        throw new Error("Failed to fetch user");
      }
      const data = await res.json();
      setUserData(data);
      const pages = Math.max(1, Math.ceil((data.public_repos || 0) / REPOS_PER_PAGE));
      setTotalPages(pages);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoadingUser(false);
    }
  }, []);

  // Fetch repos for the given username and page
  const fetchRepos = useCallback(async (u, p = 1) => {
    setLoadingRepos(true);
    setRepos([]);
    setError("");
    try {
      const res = await fetch(
        `https://api.github.com/users/${u}/repos?per_page=${REPOS_PER_PAGE}&page=${p}&sort=updated`
      );
      if (!res.ok) throw new Error("Failed to fetch repositories");
      const data = await res.json();
      setRepos(data);
    } catch (err) {
      setError(err.message || "Failed to load repos");
    } finally {
      setLoadingRepos(false);
    }
  }, []);

  // Handler for starting a search (from button or Enter)
  const handleSearch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const u = username.trim();
    if (!u) {
      setError("Please enter a GitHub username");
      return;
    }
    if (u === query) {
      // same as current search: refresh repos for current page
      fetchRepos(u, page);
      return;
    }
    setQuery(u);
    setPage(1);
    await fetchUser(u);
    await fetchRepos(u, 1);
  };

  const handleHome = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    // reset everything to initial state
    setUsername("");
    setQuery("");
    setUserData(null);
    setRepos([]);
    setError("");
    setPage(1);
    setTotalPages(1);
    // focus input
    try { inputRef.current && inputRef.current.focus(); } catch {}
  };

  // When page changes, fetch repos for same user
  useEffect(() => {
    if (!query) return;
    fetchRepos(query, page);
  }, [page, query, fetchRepos]);

  // Simple Enter to search on input
  const onInputKeyDown = (e) => {
    if (e.key === "Enter") handleSearch(e);
  };

  return (
    <div className="app-root">
      <div className="app-container">
        {/* Top navigation bar */}
        <nav className="navbar">
          <div className="nav-inner">
            <div className="nav-left">
              <svg className="brand-mark" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#g)" />
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0" stopColor="#7C5AED" />
                    <stop offset="1" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
              </svg>
              <a href="#" className="nav-home" onClick={handleHome}>Home</a>
            </div>

            <div className="nav-right">
              <button
                className="theme-toggle"
                onClick={() => setTheme((t) => t === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                title="Toggle theme"
              >{theme === 'dark' ? '🌙' : '☀️'}</button>
            </div>
          </div>
        </nav>

        {/* Hero: centered title, description and search */}
        <section className="hero">
          <div className="hero-inner">
            <h1 className="brand-title">GitHub Profile Viewer</h1>
            <p className="subtitle">Quickly lookup public GitHub profiles and repositories</p>

            <form className="search" onSubmit={handleSearch}>
              <label htmlFor="username" className="visually-hidden">GitHub username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={onInputKeyDown}
                ref={inputRef}
                aria-label="GitHub username"
              />
              <button type="submit" className="btn-primary" disabled={loadingUser || loadingRepos}>
                {loadingUser ? 'Fetching...' : 'Search'}
              </button>
            </form>

            {error && <div className="error-card">{error}</div>}
          </div>
        </section>

        <main className="content">
          {/* Profile column */}
          <section className="profile-col">
            {loadingUser && <div className="loading">Fetching user...</div>}
            {userData && <Profile user={userData} />}
          </section>

          {/* Repos column */}
          <section className="repos-col">
            <RepoList
              repos={repos}
              loading={loadingRepos}
              username={query}
              page={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </section>
        </main>

        <footer className="app-footer">Made with ❤️ <a href="https://github.com">GitHub API</a></footer>
      </div>
    </div>
  );
}

export default App;
