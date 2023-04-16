import { useState } from 'react';
import '../assets/home.css';
import { fetchChangeWord } from '../services';

function Home({ userWord, updateWord }) {
  const [word, setWord] = useState('');
  const [err, setErr] = useState('');

  const handleInputChange = (e) => {
    setWord(e.target.value);
  }

  const doChangeWord = () => {
    fetchChangeWord(word)
      .then( res => {
        setWord('');
        updateWord(res.word);
        setErr('');
      })
      .catch( err => {
        setErr(err?.error || 'ERROR');
      });
  }

  return (
    <main className="home">
      <div className="content">
        <div className="line">
          <label className="title">Stored word:</label>
          <h3>{userWord}</h3>
        </div>
        <div className="operation">
          <label>
            Change word:
            <input type="text" name="word" placeholder="word" value={word} onChange={handleInputChange} />
          </label>
          <button type="submit" className="action" onClick={doChangeWord}>Submit</button>
          <p className="tip">{err}</p>
        </div>
      </div>
    </main>
  );
}

export default Home;
