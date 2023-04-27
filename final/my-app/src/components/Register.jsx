import'../assets/register.css'
import { useState } from "react";
import { fetchRegister } from "../util/services";

function Register() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [slogan, setSlogan] = useState('');
  const [registerMsg, setRegisterMsg] = useState('');
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [nameError, setNameError] = useState('');
  const [avatarError, setAvatarError] = useState('');
  const [sloganError, setSloganError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  }

  const handleSloganChange = (e) => {
    setSlogan(e.target.value);
  }

  const checkInput = () => {
    if (!name || !name.trim() || !name.match(/^[A-Za-z0-9_]+$/) || name.length > 20 || name === 'dog') {
      setNameError('invalid username');
      return;
    }

    if (avatar !== '' && !/\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(avatar)) {
      setAvatarError('invalid avatar');
      return;
    }

    if (slogan !== '' && slogan.length > 20) {
      setSloganError('invalid slogan');
      return;
    }

    doRegister();
  }

  const doRegister = () => {
    fetchRegister(name, avatar, slogan)
      .then( res => {
        setName('');
        setAvatar('');
        setSlogan('');
        setIsRegisterSuccess(true);
        setRegisterMsg('The registration is successful, you can log in now');
      })
      .catch( err => {
        setIsRegisterSuccess(false);
        setRegisterMsg(err?.error || 'ERROR');
      });
  }

  return (
    <main className="register__main">
      <div className="register">
        <p className="register__prompt">Please Sign Up: </p>
        <div className="register__form">
          <label>
            Username:
            <input className="register__input" type="text" value={name} onChange={handleNameChange} />
          </label>
          <span className="register__error">{nameError}</span>
          <label>
            Avatar:
            <input className="register__input" type="text" value={avatar} onChange={handleAvatarChange} />
          </label>
          <span className="register__error">{avatarError}</span>
          <label>
            Slogan:
            <input className="register__input" type="text" value={slogan} onChange={handleSloganChange} />
          </label>
          <span className="register__error">{sloganError}</span>
          <button className="register__submit" onClick={checkInput}>Submit</button>
          <span className={isRegisterSuccess ? 'register__success' : 'register__error'}>{registerMsg}</span>
        </div>
      </div>
    </main>
  );
}

export default Register;