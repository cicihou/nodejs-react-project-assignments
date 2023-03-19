const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

function getAllUser() {
  const allUsers = Object.values(sessions);
  const users = [];
  for (let i = 0; i < allUsers.length; i++) {
    if (users.findIndex(val => val.username === allUsers[i].username) === -1) {
      users.push(allUsers[i]);
    }
  }
  return users;
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getAllUser
};
