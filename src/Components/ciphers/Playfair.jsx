import React, { useState } from 'react';
import { playfairEncrypt, playfairDecrypt } from '../../utils/cryptoUtils.js';
import InputField from '../common/InputField';
import ResultDisplay from '../common/ResultDisplay';
import MatrixDisplay from '../common/MatrixDisplay';

function Playfair({ mode }) {
  const [text, setText] = useState('');
  const [key, setKey] = useState('PLAYFAIR');
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
        setResult(playfairEncrypt(text, key, setMatrix));
      } else {
        setResult(playfairDecrypt(text, key, setMatrix));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cipher-container">
      <h2>Playfair Cipher - {mode === 'encrypt' ? 'Encryption' : 'Decryption'}</h2>

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
          <h3>Playfair Matrix</h3>
          <table className="playfair-matrix">
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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

export default Playfair;