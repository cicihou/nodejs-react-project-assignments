const express = require("express");
const { guess, newGame, login, logout } = require("./controller.js");

const page = require("./page.js");

const router = express.Router();

// PUT ROUTE HERE
router.get("/", page.renderHome);

router.post("/login", login);
router.post("/logout", logout);

router.post("/guess", guess);
router.post("/new-game", newGame);

module.exports = router;
