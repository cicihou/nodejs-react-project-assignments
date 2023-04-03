import { useState } from 'react';
import '../assets/game.css';
import { checkWord } from './util'

function Game() {
  const [word, setWord] = useState('');
  const [words, setWords] = useState([]);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setWord(e.target.value);
  }

  const guessWord = () => {
    if (word.trim() !== '') {
      const result = checkWord(word);
      setMessage(result);
      setWords([...words, result]);
    }
    setWord('');
  }

  const resetGame = () => {
    setWord('');
    setWords([]);
    setMessage('');
  }

  return (
    <main className="game">
      <div className="line">
        <p className="title">Your guest history: </p>
        <button className="reset" onClick={resetGame}>New Game</button>
      </div>
      <div className="info">
        <ul className="list">
          {words.map((val, index) => <li key={index}>{val}</li>)}
        </ul>
      </div>
      <div className="operation">
        <label>
          Guess a new word:
          <input type="text" name="guess" placeholder="word" value={word} onChange={handleInputChange} />
        </label>
        <button type="submit" className="action" onClick={guessWord}>Submit</button>
        <span className="tip">{message}</span>
      </div>
    </main>
  );
}

export default Game;
