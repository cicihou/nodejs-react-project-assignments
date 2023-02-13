const express = require("express");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const app = express();
const PORT = 3000;

app.use(express.static("./public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded to parse form data, use extended: true to omit warning

const page = require("./page")

const wordStorage = {};
const userStorage = {};


app.get("/", (req, res) => {
  const userUUID = req.cookies["session-id"];
  const username = userStorage[userUUID];
  const words = wordStorage[username] || undefined;
  res.send(page.getPage(username, words));
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const userUUID = uuid.v4();
  if (username !== "dog" && /^[a-z0-9]+$/i.test(username)) {
    userStorage[userUUID] = username;
    console.log(`Read username: ${username}`);
    res.cookie("session-id", userUUID);
    res.redirect("/");
  } else {
    res.status(401);
    res.send(page.getErrorPage());
  }
});

app.post("/logout", (req, res) => {
  const sessionId = req.cookies["session-id"];
  delete userStorage[sessionId];
  res.clearCookie("session-id");
  res.redirect("/");
});

app.post("/word/add", (req, res) => {
  const sessionId = req.cookies["session-id"];
  const username = userStorage[sessionId];
  const newWords = req.body.word;
  if (username === undefined) {
    // If user is not valid, probably change the session-id and then submit a new word, do nothing
    res.redirect("/");
  }
  if (!(username in wordStorage)) {
    wordStorage[username] = []; // Add the key to avoid reading undefined
  }
  wordStorage[username][wordStorage[username].length] = newWords;

  res.redirect("/");
});

app.post("/word/replace", (req, res) => {
  const userUUID = req.cookies["session-id"];
  const username = userStorage[userUUID];
  const oldWord = req.body.oldWord;
  const newWord = req.body.word;
  if (wordStorage[username] && wordStorage[username].includes(oldWord)) {
    const oldWordIndex = wordStorage[username].indexOf(oldWord);
    wordStorage[username][oldWordIndex] = newWord;
  }

  res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
