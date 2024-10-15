import { useEffect, useState } from 'react';
import './App.css'
import GitRepo from './Model/GitRepo';
import { getAll } from './GitRepo/gitrepo.service';

function App() {
  const [gitRepo, setGitRepo] = useState<GitRepo[]>([]);
  useEffect(() => {

    getAll()
      .then(response => setGitRepo(response.data))
      .catch(error => console.log(error.message));
  }, []);

  return (
    <div className="container">
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input type="text" placeholder="enter the name you search" />
          <button className='btn btn-primary'>Search</button>
        </div>
      </section>
      <div className="row">
        {gitRepo.map((git) => (
          <div className="card">
            <a href={git.link} target="_blank">
              <img src={git.imageUrl} style={{ width: '100px' }} />
            </a>
            <p className="card-text">{git.name}</p>
          </div>
        ))}
      </div>
    </div>

  )
}
export default App
