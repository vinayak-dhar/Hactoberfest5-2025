import React from "react";

function formatDate(iso) {
  try { return new Date(iso).toLocaleDateString(); } catch { return iso; }
}

function RepoItem({ repo }) {
  return (
    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-item" role="listitem">
      <div className="repo-left">
        <div className="repo-name">{repo.name}</div>
        {repo.description && <div className="repo-desc">{repo.description}</div>}
      </div>
      <div className="repo-right">
        {repo.language && <span className="lang">{repo.language}</span>}
        <span className="stars">⭐ {repo.stargazers_count}</span>
        {repo.updated_at && <div className="updated">Updated {formatDate(repo.updated_at)}</div>}
      </div>
    </a>
  );
}

export default function RepoList({ repos = [], loading = false, username, page = 1, totalPages = 1, onPageChange = () => {} }) {
  return (
    <div className="repos-card card">
      <div className="repos-header">
        <h3>Repositories</h3>
        <div className="pager">
          <button
            className="pager-btn"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1 || loading}
          >Prev</button>
          <span className="page-indicator">{page} / {totalPages}</span>
          <button
            className="pager-btn"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages || loading}
          >Next</button>
        </div>
      </div>

      <div className="repos-list" role="list">
        {loading ? (
          // show skeletons
          Array.from({ length: 6 }).map((_, i) => (
            <div className="repo-skel" key={i}>
              <div className="skeleton line short" />
              <div className="skeleton line" />
            </div>
          ))
        ) : (
          <> {repos.length === 0 ? (
            <div className="empty">No repositories to show{username ? ` for ${username}` : ''}.</div>
          ) : (
            repos.map((r) => <RepoItem key={r.id} repo={r} />)
          )} </>
        )}
      </div>
    </div>
  );
}
