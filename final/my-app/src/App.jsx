import { useState, useEffect } from 'react';
import './assets/App.css';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Loading from "./components/Loading";
import { LOGIN_STATUS } from './util/constants'

import {
  fetchSession,
  fetchLogout,
} from './util/services';

function App() {
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUserName] = useState('');

  function updateLogin(name, word) {
    setUserName(name);
    setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
  }

  function doLogout() {
    setUserName('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout()
      .then();
  }

  function showRegister() {
    setIsRegister(!isRegister);
  }

  function checkForSession() {
    fetchSession()
      .then( session => {
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setUserName(session.user.username);
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
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && !isRegister && <button className="logout" onClick={showRegister}>Sign Up</button>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && isRegister && <button className="logout" onClick={showRegister}>Sign In</button>}
      </header>
      {loginStatus === LOGIN_STATUS.PENDING && <Loading className="waiting">Loading user...</Loading>}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && <Home />}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && !isRegister && <Login updateLogin={updateLogin}/>}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && isRegister && <Register />}
    </div>
  );
}

export default App;
