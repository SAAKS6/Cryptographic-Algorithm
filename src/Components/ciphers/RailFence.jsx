import React, { useState } from 'react';
import { railFenceEncrypt, railFenceDecrypt } from '../../utils/cryptoUtils.js';
import InputField from '../common/InputField';
import ResultDisplay from '../common/ResultDisplay';

function RailFence({ mode }) {
  const [text, setText] = useState('');
  const [rails, setRails] = useState(3);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'encrypt') {
        setResult(railFenceEncrypt(text, rails));
      } else {
        setResult(railFenceDecrypt(text, rails));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cipher-container">
      <h2>Rail Fence Cipher - {mode === 'encrypt' ? 'Encryption' : 'Decryption'}</h2>

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
          label="Number of Rails (2 or more)"
          type="number"
          value={rails}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val >= 2) setRails(val);
          }}
          min="2"
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

export default RailFence;