import React, { useState } from 'react';
import { caesarEncrypt, caesarDecrypt } from '../../utils/cryptoUtils.js';
import InputField from '../common/InputField';
import ResultDisplay from '../common/ResultDisplay';

function CaesarCipher({ mode }) {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'encrypt') {
      setResult(caesarEncrypt(text, shift));
    } else {
      setResult(caesarDecrypt(text, shift));
    }
  };

  return (
    <div className="cipher-container">
      <h2>Caesar Cipher - {mode === 'encrypt' ? 'Encryption' : 'Decryption'}</h2>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Text"
          type="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <InputField
          label="Shift Value (0-25)"
          type="number"
          value={shift}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val >= 0 && val <= 25) setShift(val);
          }}
          min="0"
          max="25"
          required
        />

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

export default CaesarCipher;