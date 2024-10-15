import { useState } from 'react';
import './App.css'
import GitRepo from './Model/GitRepo';
import { getAll } from './GitRepo/gitrepo.service';

function App() {
  const [gitRepo, setGitRepo] = useState<GitRepo[]>([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    if (username !== "") {
      setIsLoading(true)
      setGitRepo([])
      getAll(username)
        .then(response => setGitRepo(response.data.items))
        .catch(error => console.log(error.message))
        .finally(() => setIsLoading(false))
    }
  }
  return (
    <div className="container">
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input type="text" placeholder="enter the name you search" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button className='btn btn-primary' onClick={() => getData()}>Search</button>
        </div>
      </section>
      {isLoading && <h3 className="jumbotron-heading">Loading data......</h3>}
      <div className="row">
        {gitRepo.map((git) => (
          <div className="card">
            <a href={git.html_url} target="_blank">
              <img src={git.avatar_url} style={{ width: '100px' }} />
            </a>
            <p className="card-text">{git.login}</p>
          </div>
        ))}
      </div>
    </div>

  )
}
export default App
