import { useState } from 'react';
import './App.css'
import GitRepo from './Model/GitRepo';
import { getAll } from './GitRepo/gitrepo.service';

function App() {
  const [gitRepo, setGitRepo] = useState<GitRepo[]>([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>("Please enter a username.");

  const getData = () => {
    setGitRepo([]);

    if (username.trim() === "") {
      setError("Please enter a username.");
      return;
    }

    setIsLoading(true);
    setError(null);

    getAll(username)
      .then(response => setGitRepo(response.data.items))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false))
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getData();
    }
  };
  return (
    <div className="container">
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input
            type="text"
            placeholder="Enter the username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-primary"
            onClick={getData}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </section>
      {isLoading && <h3 className="jumbotron-heading">Loading data...</h3>}
      <div className="row">
        {gitRepo.map(({ login, html_url, avatar_url }) => (
          <div className="card" key={login}>
            <a href={html_url} target="_blank" rel="noopener noreferrer">
              <img src={avatar_url} alt={`${login}'s avatar`} style={{ width: '100px' }} />
            </a>
            <p className="card-text">{login}</p>
          </div>
        ))}
      </div>
    </div>

  )
}
export default App
