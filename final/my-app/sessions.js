const uuid = require('uuid').v4;

// sessions = {sid: {username, avatar, slogan, status}}
const sessions = {};

function addSession(userinfo) {
  const sid = uuid();
  userinfo.status = 1;
  sessions[sid] = userinfo;
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid];
}

function deleteSession(sid) {
  sessions[sid].status = 0;
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
