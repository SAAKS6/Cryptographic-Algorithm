import React, { useState } from 'react';
import { otpEncrypt, otpDecrypt } from '../../utils/cryptoUtils.js';
import InputField from '../common/InputField';
import ResultDisplay from '../common/ResultDisplay';

function OneTimePad({ mode }) {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'encrypt') {
        setResult(otpEncrypt(text, key));
      } else {
        setResult(otpDecrypt(text, key));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cipher-container">
      <h2>One Time Pad - {mode === 'encrypt' ? 'Encryption' : 'Decryption'}</h2>

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
          info="Must be at least as long as the text (excluding spaces)"
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

export default OneTimePad;