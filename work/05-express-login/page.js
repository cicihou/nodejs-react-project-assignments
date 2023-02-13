const page = {
  getTemplet(pageTitle, pageContent) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="style.css">
          <title>${pageTitle}</title>
      </head>
    
      <body>
          ${pageContent}
      </body>
      
      </html>
            `;
  },

  getLogin() {
    return `
      <header class="page-header"><h2>Welcome!</h2><p>Please login.</p></header>
      <main class="page-content">
        <div class="login-panel">
            <p class="prompt">Please Log in: </p>
            <form class="login-form" action="/login" method="post">
            <label>
                Username:
                <input class="info-input" type="text" name="username" required>
            </label>
            <button class="submit-button" type="submit">Submit</button>
            </form>
        </div>
      </main>
    `;
  },

  getWordsListItem(wordsArray) {
    if (wordsArray) {
      return wordsArray.map((word) => `<li>${word}</li>`).join("");
    }
    return "";
  },

  getHome(username, words) {
    return `
      <header class="page-header">
        <h2>Welcome! ${username}</h2>
        <p><form action="/logout" method="post"><button type="submit" class="logout-button">Log out</form></p>
      </header>
      <main class="page-content">
        <div class="home-panel">
            <p class="prompt">stored word: </p>
            <ul class="words-list">
                ${this.getWordsListItem(words)}
            </ul>
            <form action="/word/add" method="post">
                  <label>
                      Add words:
                      <input class="info-input" type="text" name="word" placeholder="new word" required>
                  </label>
                  <button class="submit-button" type="submit">Submit</button>
              </form>
              <form action="/word/replace" method="post">
                  Replace words:
              <label>
                  Old words: 
                  <input class="info-input" type="text" name="oldWord" placeholder="old word" required>
              </label>
              <label>
                  New words:
                  <input class="info-input" type="text" name="word" placeholder="new word" required>
              </label>
              <button class="submit-button" type="submit">Submit</button>
        </div>
      </main>
    `;
  },

  getPage(username, words) {
    if (username) {
      return this.getTemplet('Dashboard', this.getHome(username, words));
    } else {
      return this.getTemplet('Log in', this.getLogin());
    }
  },

  getErrorPage() {
    const errorContent = `
      <header class="page-header"><h2>Welcome!</h2><a href="/">Log in</a></header>
      <main class="page-content">
        <p class="login-prompt">Log in failed.</p>
        <p><a href="/">Return to Home Page</a></p>
      </main>
    `;
    return this.getTemplet("Error", errorContent);
  }
};
module.exports = page;