const sessions = require('./sessions');

// users = {username: {username, avatar, slogan, status}}
const users = {};

function isUsernameRegister(username) {
  return users.hasOwnProperty(username);
}

function isValidUsername(username) {
  let isValid;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/) && username.length <= 20;
  return isValid;
}

function isValidUserAvatar(avatar) {
  return /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(avatar);
}

function isValidUserSlogan(slogan) {
  return slogan == null || slogan === '' || slogan.length <= 20;
}

function addUser(username, avatar, slogan) {
  users[username] = {username, avatar, slogan, status: 0}
}

function getUser(username) {
  return users[username]
}

function getAllUsers() {
  const allUsers = Object.values(users);
  const allSessions = Object.values(sessions.getAllSessions());
  const list = [];
  for (let i = 0; i < allUsers.length; i++) {
    const currentSession = allSessions.find((val) => val.username === allUsers[i].username);
    list.push({
      username: allUsers[i].username,
      avatar: allUsers[i].avatar,
      slogan: allUsers[i].slogan,
      status: currentSession ? currentSession.status : allUsers[i].status
    });
  }
  return list;
}

module.exports = {
  isValidUsername,
  isValidUserAvatar,
  isValidUserSlogan,
  isUsernameRegister,
  addUser,
  getUser,
  getAllUsers
};
