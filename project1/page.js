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
          ${page.getNavElement(username)}
          ${page.getMainElement(username)}
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
        ${
            !username
                ? `<header class="page-header"><h2>Welcome!</h2><p>Please login.</p></header>`
                : `<header class="page-header">
                  <h2>Welcome! ${username}</h2>
                  <p>
                      <form action="/logout" method="post"><button type="submit" class="submit-button"/>Log out</form>
                  </p>
              </header>`
        }
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
        if (userStat && Object.keys(userStat).length) {
            if (userStat.guessedWord.length) {
                lastGuessElement = `<p class="game-operation-tip">Last guess 
                    "${userStat.guessedWord[userStat.guessedWord.length - 1][0]}" was 
                     ${userStat.lastGuessStatus}, and have 
                     ${userStat.guessedWord[userStat.guessedWord.length - 1][1]} characters in common.
                </p>`;
            }
            guessHistoryElement = `<div class="game-operation-list"><ul>
                ${userStat.guessedWord.map((entry) =>`<li>${entry.join(": ")} characters in common</li>`).join("")}
                </ul></div>`;
            guessCountElement = `<p class="game-prompt">You have ${userStat.guessedCount} guess.</p>`;
            guessFormElement = `<form action="/guess" method="post" class="new-guess">
                            <label>Guess a new word: <input type="text" name="guess" placeholder="word" required></label>
                            <button type="submit" class="submit-button">Submit</button></form>`;
        }
        if (userStat.lastGuessStatus === 'correct') {
            wonMessageElement = `<p class="game-prompt win">You won the game!</p>`;
        }
        return `
            <main class="page-content">
                <div class="home-panel">
                    <p class="prompt">Secret word list: </p>
                    ${page.getErrorMsg(username)}
                    <p class="words-list">
                        ${words.filter((entry) => !userStat.guessedWord.includes(entry)).join(", ")}
                    </p>
                    <p class="prompt">Your operation: </p>
                    ${lastGuessElement}
                    <div class="game-line">
                        <p>Your guest history: </p>
                        ${guessFormElement}
                    </div>
                    <div class="words-list">
                        ${guessHistoryElement}
                    </div>
                    <div class="game-line">
                        ${guessCountElement}
                        ${wonMessageElement}
                    </div>
                    <form action="/new-game" method="post" class="new-game">
                        <button type="submit" class="submit-button">New Game</button>
                    </form>
                </div>
            </main>
    `;
    },

    getLoginPage(err) {
        return `
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
