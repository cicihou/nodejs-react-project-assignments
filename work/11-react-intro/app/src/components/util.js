const SECRET = 'RECAT';

export function checkUserName(name) {
  const username = name.trim()
  if (username === '' || !username.match(/^[A-Za-z0-9_]+$/)) {
    return 'the username is not made up of valid characters';
  }

  if (username === 'dog') {
    return 'dog is not a valid user'
  }

  return '';
}

export function checkWord(w) {
  const word = w.trim();
  if (word === '' || word.length !== 5 || !word.match(/^[A-Za-z]*$/)) {
    return word + ' was not a valid word';
  }

  if (word.toUpperCase() === SECRET) {
    return word + ' is the secret word!';
  }

  return `${word} had ${compare(word)} letters in common`;
}

function compare(w) {
  let ans = 0;

  const word = w.toLowerCase();
  const guess = SECRET.toLowerCase();

  let wordCnt = {};
  let guessCnt = {};

  for (let ch of word) {
    if (!(ch in wordCnt)) {
      wordCnt[ch] = 0;
    }
    wordCnt[ch] += 1;
  }

  for (let ch of guess) {
    if (!(ch in guessCnt)) {
      guessCnt[ch] = 0;
    }
    guessCnt[ch] += 1;
  }

  for (let ch in guessCnt) {
    if (ch in wordCnt) {
      ans += Math.min(wordCnt[ch], guessCnt[ch]);
    }
  }

  return ans;
}