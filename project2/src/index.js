import {checkSession, fetchLogin, fetchUsers, logout, postMessage, fetchMessages} from './services';
import {renderLogin, renderHome, renderUserList, renderMsgList} from './view'

const rootEl = document.querySelector('#root');
const loading = document.querySelector('.loading');
let intervalUser;
let intervalMsg;

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

  if (e.target.classList.contains('send__msg')) {
    const inputEl = document.getElementsByClassName('input__msg')[0];
    const msg = inputEl.value;
    if (msg == null || msg === '') return;
    postMessage(msg)
      .then(res => {
        inputEl.value = '';
        doFetchMessages();
        startIntervalForMessages();
      })
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
  startIntervalForUsers();
  startIntervalForMessages();
}

function doFetchUsers() {
  const userLoading = document.querySelector('.user__loading');
  userLoading.style.display = 'flex';
  fetchUsers()
    .then(res => {
      renderUserList(res.users);
    })
    .catch(error => {})
    .finally(() => { userLoading.style.display = 'none'; })
}

function startIntervalForUsers() {
  clearInterval(intervalUser);
  intervalUser = setInterval(() => {
    doFetchUsers();
  }, 5000);
}

function doFetchMessages() {
  const msgLoading = document.querySelector('.msg__loading');
  msgLoading.style.display = 'flex';
  fetchMessages()
    .then(res => {
      renderMsgList(res.msgList);
    })
    .catch(error => {})
    .finally(() => { msgLoading.style.display = 'none'; })
}

function startIntervalForMessages() {
  clearInterval(intervalMsg);
  intervalMsg = setInterval(() => {
    doFetchMessages();
  }, 5000);
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
