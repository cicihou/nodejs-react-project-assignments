import {checkSession, fetchLogin, fetchUsers, logout} from './services';
import {renderLogin, renderHome, renderUserList, renderMsgList} from './view'

const rootEl = document.querySelector('#root');
const loading = document.querySelector('.loading');

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
});

function doLogin(username) {
  fetchLogin(username)
    .then(res => {
      document.getElementsByClassName('login__msg')[0].innerText = '';
      getHome(res.username);
    })
    .catch(error => {
      document.getElementsByClassName('login__msg')[0].innerText = error.error;
    })
}

function getHome(username) {
  renderHome(rootEl, username);
  doFetchUsers();
  doFetchMessages();
}

function doFetchUsers() {
  fetchUsers()
    .then(res => {
      console.log(res)
      renderUserList(res.users);
    })
    .catch(error => {})
}

function doFetchMessages() {
  renderMsgList();
}

checkSession()
  .then(res => {
    getHome(res.username);
    loading.style.display = 'none';
  })
  .catch(error => {
    renderLogin(rootEl);
    loading.style.display = 'none';
  });