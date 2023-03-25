const messages = [];

function addMsg(username, message) {
  const date = new Date();
  const time = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear() + ' '
    + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  messages.push({
    username,
    message,
    time
  });
}

function getAllMsg() {
  return messages;
}

module.exports = {
  addMsg,
  getAllMsg
}
