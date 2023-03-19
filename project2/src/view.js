export function renderLogin(rootEl) {
  rootEl.innerHTML = `
    <header class="page__header"><h2>Welcome!</h2><p>Please login.</p></header>
    <main class="main">
      <div class="login__panel">
        <p class="prompt">Please Log in: </p>
        <div class="login__form">
          <label>
              Username:
              <input class="info__input" type="text" name="username" required>
          </label>
          <button class="login__button">Submit</button>
          <span class="login__msg"></span>
        </div>
      </div>
    </main>
  `
}

export function renderHome(rootEl, username) {
  rootEl.innerHTML = `
    <header class="page__header"><h2>Welcome! ${username}</h2><button class="logout__button">Log out</button></header>
    <main class="main">
      <div class="chat">
        <ul class="user__list"></ul>
        <div class="message">
            <ul class="msg__list"></ul>
            <div class="msg__input">
                <input class="input__msg"/>
                <button class="send_msg">Send</button>
            </div>
        </div>
      </div>
    </main>
  `
}

export function renderUserList(users) {
  const userList = document.querySelector('.user__list');
  userList.innerHTML = users.map((user) => `<li class="user__list__item">${user.username}</li>`).join("");
}

export function renderMsgList() {
  const msgList = document.querySelector('.msg__list');
  msgList.innerHTML = `
    <li class="msg__list__item">
        <p class="msg__user">user1</p>
        <p class="msg__text">hello word!</p>
    </li>
    <li class="msg__list__item">
        <p class="msg__user">user1</p>
        <p class="msg__text">hello word!hello word!hello word!hello word!hello word!hello word!hello word!hello word!hello word!</p>
    </li>
  `
}