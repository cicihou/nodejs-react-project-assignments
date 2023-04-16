import { useState } from 'react';
import '../assets/login.css';
import { fetchLogin } from '../services';

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
    <main className="main">
      <div className="login">
        <p className="prompt">Please Log in: </p>
        <div className="form">
          <label>
            Username:
            <input className="username" type="text" value={name} onChange={handleInputChange} />
          </label>
          <button className="submit" onClick={doLogin}>Submit</button>
          <span className="message">{loginMsg}</span>
        </div>
      </div>
    </main>
  );
}

export default Login;
