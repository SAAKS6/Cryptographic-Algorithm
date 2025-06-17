import React, { useState } from 'react';
import { affineEncrypt, affineDecrypt } from '../../utils/cryptoUtils.js';
import InputField from '../common/InputField';
import ResultDisplay from '../common/ResultDisplay';

const validAValues = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

function AffineCipher({ mode }) {
  const [text, setText] = useState('');
  const [a, setA] = useState(5);
  const [b, setB] = useState(8);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'encrypt') {
        setResult(affineEncrypt(text, a, b));
      } else {
        setResult(affineDecrypt(text, a, b));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cipher-container">
      <h2>Affine Cipher - {mode === 'encrypt' ? 'Encryption' : 'Decryption'}</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <InputField
          label="Text"
          type="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <div className="key-inputs">
          <div className="key-input">
            <label>Key 'a' (coprime to 26):</label>
            <select
              value={a}
              onChange={(e) => setA(parseInt(e.target.value))}
              required
            >
              {validAValues.map(value => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>

          <div className="key-input">
            <label>Key 'b' (0-25):</label>
            <input
              type="number"
              value={b}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= 0 && val <= 25) setB(val);
              }}
              min="0"
              max="25"
              required
            />
          </div>
        </div>

        <button type="submit" className="action-button">
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>
      </form>

      {result && (
        <ResultDisplay
          label="Result"
          value={result}
        />
      )}
    </div>
  );
}

export default AffineCipher;