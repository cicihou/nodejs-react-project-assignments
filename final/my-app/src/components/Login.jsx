import { useState } from 'react';
import'../assets/login.css'
import { fetchLogin } from "../util/services";

function Login({ updateLogin }) {
  const [name, setName] = useState('');
  const [loginMsg, setLoginMsg] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  }

  const doLogin = () => {
    fetchLogin(name)
      .then( res => {
        updateLogin(name, res.word);
        setName('');
      })
      .catch( err => {
        setLoginMsg(err?.error || 'ERROR');
      });
  }

  return (
    <main className="login__main">
      <div className="login">
        <p className="login__prompt">Please Log in: </p>
        <div className="login__form">
          <label>
            Username:
            <input className="login__username" type="text" value={name} onChange={handleInputChange} />
          </label>
          <button className="login__submit" onClick={doLogin}>Submit</button>
          <span className="login__message">{loginMsg}</span>
        </div>
      </div>
    </main>
  );
}

export default Login;