import React, { useState } from 'react';
import {
  rsaGenerateKeys,
  rsaEncryptText,
  rsaDecryptText
} from '../../utils/cryptoUtils.js';
import InputField from '../common/InputField';
import ResultDisplay from '../common/ResultDisplay';

function RSA({ mode }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [keys, setKeys] = useState(null);
  const [publicKey, setPublicKey] = useState({ n: '', e: '' });
  const [privateKey, setPrivateKey] = useState({ n: '', d: '' });
  const [keySize, setKeySize] = useState(6);

  const handleGenerateKeys = () => {
    try {
      const generatedKeys = rsaGenerateKeys(keySize);
      setKeys(generatedKeys);
      setPublicKey({
        n: generatedKeys.public_key[0],
        e: generatedKeys.public_key[1]
      });
      setPrivateKey({
        n: generatedKeys.private_key[0],
        d: generatedKeys.private_key[1]
      });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'encrypt') {
        setResult(rsaEncryptText(text, [parseInt(publicKey.n), parseInt(publicKey.e)]));
      } else {
        setResult(rsaDecryptText(text, [parseInt(privateKey.n), parseInt(privateKey.d)]));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cipher-container">
      <h2>RSA Cipher - {mode === 'encrypt' ? 'Encryption' : 'Decryption'}</h2>

      {error && <div className="error">{error}</div>}

      <div className="key-generation">
        <h3>Key Generation</h3>
        <div className="key-controls">
          <InputField
            label="Key Size (bits)"
            type="number"
            value={keySize}
            onChange={(e) => setKeySize(parseInt(e.target.value))}
            min="8"
            max="128"
          />
          <button
            type="button"
            className="action-button"
            onClick={handleGenerateKeys}
          >
            Generate Keys
          </button>
        </div>

        {keys && (
          <div className="key-details">
            <div className="key-pair">
              <h4>Public Key</h4>
              <p>n: {keys.public_key[0]}</p>
              <p>e: {keys.public_key[1]}</p>
            </div>
            <div className="key-pair">
              <h4>Private Key</h4>
              <p>n: {keys.private_key[0]}</p>
              <p>d: {keys.private_key[1]}</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {mode === 'encrypt' ? (
          <div className="key-inputs">
            <InputField
              label="Public Key (n)"
              type="number"
              value={publicKey.n}
              onChange={(e) => setPublicKey({ ...publicKey, n: e.target.value })}
              required
            />
            <InputField
              label="Public Key (e)"
              type="number"
              value={publicKey.e}
              onChange={(e) => setPublicKey({ ...publicKey, e: e.target.value })}
              required
            />
          </div>
        ) : (
          <div className="key-inputs">
            <InputField
              label="Private Key (n)"
              type="number"
              value={privateKey.n}
              onChange={(e) => setPrivateKey({ ...privateKey, n: e.target.value })}
              required
            />
            <InputField
              label="Private Key (d)"
              type="number"
              value={privateKey.d}
              onChange={(e) => setPrivateKey({ ...privateKey, d: e.target.value })}
              required
            />
          </div>
        )}

        <InputField
          label={mode === 'encrypt' ? "Text to Encrypt" : "Ciphertext (space-separated numbers)"}
          type={mode === 'encrypt' ? "textarea" : "text"}
          value={text}
          onChange={(e) => setText(e.target.value)}
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

export default RSA;