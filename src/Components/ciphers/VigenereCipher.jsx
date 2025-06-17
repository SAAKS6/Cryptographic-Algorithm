import React, { useState } from 'react';
import { vigenereEncrypt, vigenereDecrypt } from '../../utils/cryptoUtils.js';
import InputField from '../common/InputField';
import ResultDisplay from '../common/ResultDisplay';
import MatrixDisplay from '../common/MatrixDisplay';

function VigenereCipher({ mode }) {
  const [text, setText] = useState('');
  const [key, setKey] = useState('KEY');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [matrix, setMatrix] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!key.match(/^[a-zA-Z]+$/)) {
      setError('Key must contain only alphabetic characters');
      return;
    }

    try {
      if (mode === 'encrypt') {
        setResult(vigenereEncrypt(text, key, setMatrix));
      } else {
        setResult(vigenereDecrypt(text, key, setMatrix));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cipher-container">
      <h2>Vigenère Cipher - {mode === 'encrypt' ? 'Encryption' : 'Decryption'}</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <InputField
          label="Text"
          type="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <InputField
          label="Key"
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
        />

        <button type="submit" className="action-button">
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>
      </form>

      {matrix.length > 0 && (
        <div className="matrix-container">
          <h3>Vigenère Matrix</h3>
          <MatrixDisplay matrix={matrix} />
        </div>
      )}

      {result && (
        <ResultDisplay
          label="Result"
          value={result}
        />
      )}
    </div>
  );
}

export default VigenereCipher;