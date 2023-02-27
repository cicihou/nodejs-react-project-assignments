const uuid = require("uuid");
const wordList = require("./words.js");
const info = require("./userInfo")


const controller = {


    login(req, res) {
        const username = req.body.username;
        const userUUID = uuid.v4();
        if (username && username !== "dog" && /^[a-z0-9]+$/i.test(username)) {
            const firstLogin = !info.userStatus[username];
            (info.userStorage)[userUUID] = username;
            res.cookie("session-id", userUUID);
            if (firstLogin) {
                return controller.newGame(req, res);
            } else {
                res.redirect("/");
            }
        } else {
            res.status(401);
            res.redirect("/");
        }
    },

    logout(req, res) {
        const sessionId = req.cookies["session-id"];
        delete info.userStorage[sessionId];
        res.redirect("/");
    },

    getUsername(req) {
        const sessionId = req.cookies["session-id"];
        return info.userStorage[sessionId];
    },

    newGame(req, res) {
        // Get the userinfo
        const sessionId = req.cookies["session-id"];
        const username = req.body.username || info.userStorage[sessionId];
        if (!username) {
            res.status(401);
            res.redirect("/");
        }
        info.userStatus[username] = {};

        const word = wordList[Math.floor(Math.random() * wordList.length)];
        info.userStatus[username] = {
            word,
            lastGuessStatus: undefined,
            guessedWord: [],
            guessedCount: 0,
            won: false,
            msg: "",
        };
        console.log(`User ${username} started a new game`);
        console.log(`User ${username}'s secret word is ${word}`);
        res.redirect("/");
    },

    guess(req, res) {
        const sessionId = req.cookies["session-id"];
        const username = info.userStorage[sessionId];
        if (!username) {
            res.status(401);
            res.redirect("/"); // TODO: add error page
            return;
        }
        // Load info
        const userStat = info.userStatus[username];
        const word = info.userStatus[username].word;
        // If word is undefined, means that the game is not started yet
        const guess = req.body.guess;
        // Update count
        userStat.guessedCount += 1;
        userStat.guessedWord[userStat.guessedWord.length] = [
            guess,
            controller.compare(guess, word),
        ];
        // Compare results
        if (guess.toLowerCase() === word) {
            userStat.lastGuessStatus = 'correct';
            info.highScore[info.highScore.length] = [username, userStat.guessedCount];
        } else {
            userStat.lastGuessStatus = controller.statusGuess(guess, word, userStat);
        }
        res.redirect("/");
    },

    statusGuess(guess, word, userStat) {
        if (wordList.includes(guess.toLowerCase()) &&
            !userStat.guessedWord.includes(guess) &&
            guess.toLowerCase() !== word
        ) {
            return 'valid';
        } else if (userStat.guessedWord.includes(guess.toLowerCase()) ||
            !wordList.includes(guess.toLowerCase())
        ) {
            return 'invalid';
        } else if (wordList.includes(guess.toLowerCase()) &&
            userStat.guessedWord.includes(guess) &&
            word.toLowerCase() !== this.word
        ) {
            return 'incorrect';
        };
    },

    compare(word, guess) {
        let ans = 0;

        word = word.toLowerCase();
        guess = guess.toLowerCase();

        let wordCnt = {};
        let guessCnt = {};
        // Update Count
        for (let ch of word) {
            if (!(ch in wordCnt)) {
                wordCnt[ch] = 0;
            }
            wordCnt[ch] += 1;
        }

        for (let ch of guess) {
            if (!(ch in guessCnt)) {
                guessCnt[ch] = 0;
            }
            guessCnt[ch] += 1;
        }

        for (let ch in guessCnt) {
            if (ch in wordCnt) {
                ans += Math.min(wordCnt[ch], guessCnt[ch]);
            }
        }

        return ans;
    },

};

module.exports = controller;
