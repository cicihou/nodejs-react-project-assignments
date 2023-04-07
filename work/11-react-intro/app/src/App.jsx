import { useState } from 'react';
import './assets/App.css';
import Login from './components/Login';
import Game from './components/Game';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState('');

  const doLogin = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  }

  const doLogout = () => {
    setUserName('');
    setIsLoggedIn(false);
  }

  return (
    <div className="app">
      <header className="header">
        <h2>Welcome! {username}</h2>
        {isLoggedIn && <button className="logout" onClick={doLogout}>Log out</button>}
      </header>
      {isLoggedIn
        ? <Game/>
        : <Login doLogin={doLogin}/>
      }
    </div>
  );
}

export default App;
