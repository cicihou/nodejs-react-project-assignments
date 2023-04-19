// messages = [{id: '', sender: {}, time: 'mm-dd-yy HH:mm:ss', content: '', thumbUp: [], thumbDown: []}]
const messages = [];

function addMessage(userinfo, message) {
  const date = new Date();
  const time = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear() + ' '
    + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  messages.push({
    id: userinfo.username + date.getTime(),
    sender: userinfo,
    time,
    content: message,
    thumbUp: [],
    thumbDown: []
  });
}

function thumbUp(username, msgId) {
  const targetIndex = messages.findIndex((val) => val.id === msgId);
  if (!messages[targetIndex].thumbUp.includes(username)) {
    messages[targetIndex].thumbUp.push(username);
  }
}

function thumbDown(username, msgId) {
  const targetIndex = messages.findIndex((val) => val.id === msgId);
  if (!messages[targetIndex].thumbDown.includes(username)) {
    messages[targetIndex].thumbDown.push(username);
  }
}

function editMessage(username, msgId, text) {
  const targetMessage = messages.find((val) => val.id === msgId);
  if (targetMessage.sender.username !== username) {
    return false;
  }
  targetMessage.content = text;
  return true;
}

module.exports = {
  addMessage,
  thumbUp,
  thumbDown,
  editMessage
}