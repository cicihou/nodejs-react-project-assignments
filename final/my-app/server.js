const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
// PORT=4000 node server.js
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const users = require('./users');
const messages = require('./messages');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Register
app.post('/api/user', (req, res) => {
  const { username, avatar, slogan } = req.body;

  if(!users.isValidUsername(username)) {
    res.status(400).json({ error: 'invalid username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'disallowed user' });
    return;
  }

  if (users.isUsernameRegister(username)) {
    res.status(400).json({ error: 'username already exist' });
    return;
  }

  if (!users.isValidUserAvatar(avatar)) {
    res.status(400).json({ error: 'invalid avatar' });
    return;
  }

  if (!users.isValidUserSlogan(slogan)) {
    res.status(400).json({ error: 'invalid slogan' });
    return;
  }

  users.addUser(username, avatar, slogan);
  res.json({ username });
});

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const user = sid ? sessions.getSessionUser(sid) : null;
  if(!sid || !user) {
    res.status(401).json({ error: 'auth missing' });
    return;
  }
  res.json({ user });
});

// Login
app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValidUsername(username)) {
    res.status(400).json({ error: 'invalid username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'disallowed user' });
    return;
  }

  if (!users.isUsernameRegister(username)) {
    res.status(400).json({ error: 'username does not registered' });
    return;
  }

  const user = users.getUser(username);
  const sid = sessions.addSession(user);

  res.cookie('sid', sid);
  res.json({ user });
});

// Logout
app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const userinfo = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(userinfo) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }

  res.json({ username: userinfo.username });
});

// Set status: 0: offline, 1: online, 2: busy
app.put('/api/status', (req, res) => {
  const sid = req.cookies.sid;
  const { status } = req.body;

  const user = sid ? sessions.getSessionUser(sid) : null;
  if(!sid || !user) {
    res.status(401).json({ error: 'auth missing' });
    return;
  }

  sessions.updateStatus(sid, status);

  res.json({ status });
});

// Get all users
app.get('/api/users', (req, res) => {
  const sid = req.cookies.sid;

  const user = sid ? sessions.getSessionUser(sid) : null;
  if(!sid || !user) {
    res.status(401).json({ error: 'auth missing' });
    return;
  }

  const userList = users.getAllUsers();
  res.json({ userList });
});

// Send a message
app.post('/api/message', (req, res) => {
  const sid = req.cookies.sid;

  const user = sid ? sessions.getSessionUser(sid) : null;
  if(!sid || !user) {
    res.status(401).json({ error: 'auth missing' });
    return;
  }

  const { msg } = req.body;

  if(msg == null || msg === '') {
    res.status(400).json({ error: 'required-message' });
    return;
  }

  messages.addMessage(user, msg);
  res.json({ msgList: messages.getAllMessage() });
});

// get all message
app.get('/api/message', (req, res) => {
  const sid = req.cookies.sid;
  const user = sid ? sessions.getSessionUser(sid) : null;
  if(!sid || !user) {
    res.status(401).json({ error: 'auth missing' });
    return;
  }

  const msgList = messages.getAllMessage();
  res.json({ msgList });
});

// Thumb up a message
app.put('/api/message/thumb/up', (req, res) => {
  const sid = req.cookies.sid;

  const user = sid ? sessions.getSessionUser(sid) : null;
  if(!sid || !user) {
    res.status(401).json({ error: 'auth missing' });
    return;
  }

  const { msgId } = req.body;
  messages.thumbUp(user.username, msgId);

  const msgList = messages.getAllMessage();
  res.json({ msgList });
});

// Thumb down a message
app.put('/api/message/thumb/down', (req, res) => {
  const sid = req.cookies.sid;

  const user = sid ? sessions.getSessionUser(sid) : null;
  if(!sid || !user) {
    res.status(401).json({ error: 'auth missing' });
    return;
  }

  const { msgId } = req.body;
  messages.thumbDown(user.username, msgId);

  const msgList = messages.getAllMessage();
  res.json({ msgList });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

