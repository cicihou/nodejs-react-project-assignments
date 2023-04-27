// messages = [{id: '', sender: {}, time: 'mm-dd-yy HH:mm:ss', content: '', img, thumbUp: [], thumbDown: []}]
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
    img: /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(message) ? message : '',
    thumbUp: [],
    thumbDown: []
  });
}

function getAllMessage() {
  return messages;
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

module.exports = {
  addMessage,
  thumbUp,
  thumbDown,
  getAllMessage
}