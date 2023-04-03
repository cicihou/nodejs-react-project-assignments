import { useState } from 'react';
import '../assets/login.css';
import { checkUserName } from './util'

function Login({doLogin}) {
  const [name, setName] = useState('');
  const [loginMsg, setLoginMsg] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  }

  const login = () => {
    const msg = checkUserName(name);
    setLoginMsg(msg);
    if (msg === '') {
      doLogin(name);
      setName('');
    }
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
          <button className="submit" onClick={login}>Submit</button>
          <span className="message">{loginMsg}</span>
        </div>
      </div>
    </main>
  );
}

export default Login;