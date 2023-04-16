const words = {};

function isValidUsername(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/) && username.length <= 20;
  return isValid;
}

function isValidWord(word) {
  let isValid = true;
  isValid = isValid && word.match(/^[A-Za-z]*$/);
  return isValid;
}

function changeUserWord(username, word) {
  words[username] = word;
}

function getUserWord(username) {
  return words[username];
}

module.exports = {
  isValidUsername,
  isValidWord,
  changeUserWord,
  getUserWord
};
