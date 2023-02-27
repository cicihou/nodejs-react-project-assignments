const controller = require("./controller.js");
const info = require("./userInfo.js")
const words = require("./words")


const page = {

    render(username, err) {
        return `
    <!DOCTYPE html>
    <html lang="en">
    
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="style.css">
          <title>Game</title>
      </head>
    
      <body>
          <div class="container">
            ${page.getNavElement(username)}
            ${page.getMainElement(username)}
          </div>
      </body>
    
    </html>
    `;
    },

    renderHome(req, res) {
        const sessionId = req.cookies["session-id"];
        const username = info.userStorage[sessionId];
        res.send(page.render(username));
    },

    getNavElement(username) {
        return `
      <nav class="nav">
        <ul class="nav-list">
            ${
            !username
                ? '<li><a href="/login">Log In</a></li>'
                : `<li>
                    <form action="/logout" method="post"><button type="submit">Log Out</button>
                    </form>
                  </li>`
        }
        </ul>
      </nav>
    `;
    },

    getMainElement(username) {
        const userStat = info.userStatus[username];
        if (!username) {
            return page.getLoginPage();
        }
        let lastGuessElement = "";
        let guessHistoryElement = "";
        let guessCountElement = "";
        let wonMessageElement = "";
        let guessFormElement = "";
        let secretWordsElemet = `<p class="game-prompt">Secret word list: ${words
            .filter((entry) => !userStat.guessedWord.includes(entry)) // Filter out guessed words
            .join(", ")}</p>`;
        if (userStat && Object.keys(userStat).length) {
            if (userStat.guessedWord.length) {
                lastGuessElement = `<p class="game-prompt">
                              Last guess "${
                    userStat.guessedWord[
                    userStat.guessedWord.length - 1
                        ][0]
                }" was 
                              ${userStat.lastGuessStatus}, and have 
                              ${
                    userStat.guessedWord[
                    userStat.guessedWord.length - 1
                        ][1]
                }
                              characters in common.
                            </p>`;
            }
            guessHistoryElement = `<div class="game-prompt">
                        <p>Your guest history: </p>
                          <ul>
                          ${userStat.guessedWord
                .map(
                    (entry) =>
                        `<li>${entry.join(
                            ": "
                        )} characters in common</li>`
                )
                .join("")}
                          </ul>
                      </div>`;
            guessCountElement = `<p class="game-prompt">
                            You have ${userStat.guessedCount} guess.
                           </p>`;
            guessFormElement = `<form action="/guess" method="post" class="new-guess">
                            <label>Guess a new word: <input type="text" name="guess" placeholder="word" required></label>
                            <button type="submit">Submit</button>
                          </form>`;
        }
        if (userStat.lastGuessStatus === 'correct') {
            wonMessageElement = `<p class="game-prompt win">You won the game!</p>`;
        }
        return `
      <main class="main">
          <div class="welcome-prompt">
              <h1 class="welcome-prompt-text">Welcome! <span class="username-text">${username}</span></h1>
          </div>
              
                  <div class="game">
                      ${page.getErrorMsg(username)}
                      ${secretWordsElemet}
                      ${lastGuessElement}
                      ${guessHistoryElement}
                      ${guessCountElement}
                      ${wonMessageElement}
                      ${guessFormElement}
                  </div>
              <form action="/new-game" method="post" class="new-game">
                  <button type="submit">New Game</button>
              </form>
          </div>
      </main>
    `;
    },

    getLoginPage(err) {
        return `
    <main class="main">
      <div class="welcome-prompt">
          <h1 class="welcome-prompt-text">Welcome!</h1>
      </div>
      <div class="login">
          <p class="login-error-msg">${
            err || "Invalid Credential, please login again: "
        }</p>
          <form action="/login" method="POST" class="login-form">
              <label>Username<input type="text" name="username" required></label>
              <button type="submit">Log In</button>
          </form>
      </div>
    </main>     
    `;
    },

    getErrorMsg(username) {
        if (!Object.keys(info.userStatus).length) {
            return ``;
        }
        const userStat = info.userStatus[username];
        const msg = userStat.msg;
        return `
    <p class="msg">${msg}</p>
    `;
    },

};

module.exports = page;
