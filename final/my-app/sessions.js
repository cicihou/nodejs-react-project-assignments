const uuid = require('uuid').v4;

// sessions = {sid: {username, avatar, slogan, status}}
const sessions = {};

function addSession(userinfo) {
  const sid = uuid();
  sessions[sid] = userinfo;
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid];
}

function deleteSession(sid) {
  delete sessions[sid];
}

function updateStatus(sid, status) {
  sessions[sid].status = status;
}

function getAllSessions() {
  return sessions;
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  updateStatus,
  getAllSessions
};
