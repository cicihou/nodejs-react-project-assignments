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

export function renderHome(rootEl, info) {
  rootEl.innerHTML = `
    <header class="page__header"><h2>Welcome! ${info.username}</h2><button class="logout__button">Log out</button></header>
    <main class="main">
      <div class="home__panel">
        <p class="prompt">stored word: </p>
        <h3 class="stored__word">${info.storedWord}</h3>
        <input class="word__input" type="text" required>
        <button class="update__button">Update</button>
      </div>
      <span class="update__msg"></span>
    </main>
  `
}
