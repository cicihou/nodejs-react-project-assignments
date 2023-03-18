import {checkSession, fetchLogin, getStoredWord, logout, updatesStoredWord} from './services';
import {renderLogin, renderHome} from './view'

const rootEl = document.querySelector('#root');

rootEl.addEventListener('click', (e) => {
  if(e.target.classList.contains('login__button')) {
    const username = document.getElementsByClassName('info__input')[0].value;
    doLogin(username);
  }

  if (e.target.classList.contains('logout__button')) {
    logout()
      .then(res => {
        renderLogin(rootEl);
      });
  }

  if (e.target.classList.contains('update__button')) {
    const newWord = document.getElementsByClassName('word__input')[0].value;
    doUpdateWord(newWord);
  }
});

function doLogin(username) {
  fetchLogin(username)
    .then(res => {
      getHome();
      document.getElementsByClassName('login__msg')[0].innerText = '';
    })
    .catch(error => {
      document.getElementsByClassName('login__msg')[0].innerText = error.error;
    })
}

function getHome() {
  getStoredWord()
    .then(res => {
      renderHome(rootEl, res);
    })
    .catch(error => {

    })
}

function doUpdateWord(word) {
  updatesStoredWord(word)
    .then(res => {
      document.getElementsByClassName('stored__word')[0].innerText = word;
      document.getElementsByClassName('update__msg')[0].innerText = '';
      document.getElementsByClassName('word__input')[0].value = '';
    })
    .catch(error => {
      document.getElementsByClassName('update__msg')[0].innerText = error.error;
    })
}

checkSession()
  .then(res => {
    getHome(res.username);
  })
  .catch(error => {
    renderLogin(rootEl);
  });
