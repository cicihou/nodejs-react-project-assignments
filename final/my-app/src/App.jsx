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
  const [user, setUser] = useState(null);

  function updateLogin(user) {
    setUser(user);
    setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
  }

  function doLogout() {
    setUser(null);
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
        setUser(session.user);
      })
      .catch( err => {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setUser(null);
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
        <h2>Welcome! {(user && user.username) || ''}</h2>
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && <button className="logout" onClick={doLogout}>Log out</button>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && !isRegister && <button className="logout" onClick={showRegister}>Sign Up</button>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && isRegister && <button className="logout" onClick={showRegister}>Sign In</button>}
      </header>
      {loginStatus === LOGIN_STATUS.PENDING && <Loading className="waiting">Loading user...</Loading>}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && <Home currentUser={user}/>}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && !isRegister && <Login updateLogin={updateLogin}/>}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && isRegister && <Register />}
    </div>
  );
}

export default App;
