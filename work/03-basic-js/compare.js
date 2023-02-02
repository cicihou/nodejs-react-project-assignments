"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

  /* YOU MAY MODIFY THE LINES BELOW */
  // console.log(word, guess)
  let words = {}
  for (let i = 0; i < word.length; i++) {
    let key = word[i].toLowerCase()
    if (words[key] !== undefined) {
      words[key] += 1
    } else {
      words[key] = 1
    }
  }
    let gss = {}
    for (let i = 0; i < guess.length; i++) {
      let key = guess[i].toLowerCase()
      if (gss[key] !== undefined) {
        gss[key] += 1
      } else {
        gss[key] = 1
      }
    }

  // console.log(words, gss)

  let res = 0
  for (let char1 in words) {
    for (let char2 in gss) {
      if (char1 === char2){
        res += Math.min(words[char1], gss[char2])
      }
    }
  }

  return res; // this line is wrong
}
