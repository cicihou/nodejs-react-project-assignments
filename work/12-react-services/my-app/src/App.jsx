import { useState, useEffect } from 'react';
import './assets/App.css';
import Login from './components/Login';
import Home from './components/Home'
import Loading from './components/Loading'
import { LOGIN_STATUS } from './constants';
import {
  fetchSession,
  fetchLogout,
} from './services';

function App() {
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [username, setUserName] = useState('');
  const [userWord, setUserWord] = useState('');

  function updateLogin(name, word) {
    setUserName(name);
    setUserWord(word);
    setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
  }

  function doLogout() {
    setUserName('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout()
      .then();
  }

  function updateWord(word) {
    setUserWord(word);
  }

  function checkForSession() {
    fetchSession()
      .then( session => {
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setUserName(session.username);
        setUserWord(session.word);
      })
      .catch( err => {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setUserName('');
      });
  }

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  return (
    <div className="app">
      <header className="header">
        <h2>Welcome! {username}</h2>
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && <button className="logout" onClick={doLogout}>Log out</button>}
      </header>
      {loginStatus === LOGIN_STATUS.PENDING && <Loading className="waiting">Loading user...</Loading>}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && <Home userWord={userWord} updateWord={updateWord}/>}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <Login updateLogin={updateLogin}/>}
    </div>
  );
}

export default App;
