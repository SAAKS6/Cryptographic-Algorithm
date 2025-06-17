import React, { useState, useEffect } from 'react';
import { sha256Hash } from '../../utils/cryptoUtils';
import InputField from '../common/InputField';
import ResultDisplay from '../common/ResultDisplay';

function SHA256({ mode }) {
  const [text, setText] = useState('');
  const [hash, setHash] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [verificationHash, setVerificationHash] = useState('');
  const [hasVerified, setHasVerified] = useState(false);


  // Validate mode on mount
  useEffect(() => {
    if (mode !== 'encrypt' && mode !== 'decrypt') {
      setError('Invalid mode. Must be "encrypt" or "decrypt".');
    }

    setHasVerified(false);
  }, [mode]);

  const handleEncrypt = (e) => {
    e.preventDefault();
    setError('');

    try {
      const generatedHash = sha256Hash(text);
      setHash(generatedHash);
      setResult(generatedHash);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDecrypt = (e) => {
    e.preventDefault();
    setError('');
    setHasVerified(true);

    try {
      const generatedHash = sha256Hash(text);
      setHash(generatedHash);
      setResult(
        generatedHash === verificationHash
          ? '✓ Hash matches!'
          : '✗ Hash does not match!'
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="cipher-container">
      <h2>SHA-256 Hash {mode === 'decrypt' ? 'Verification' : 'Generation'}</h2>

      {error && <div className="error">{error}</div>}

      {mode === 'encrypt' ? (
        <form onSubmit={handleEncrypt}>
          <InputField
            label="Text to Hash"
            type="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button type="submit" className="action-button">
            Generate Hash
          </button>
        </form>
      ) : mode === 'decrypt' ? (
        <form onSubmit={handleDecrypt}>
          <InputField
            label="Text to Verify"
            type="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <InputField
            label="Expected SHA-256 Hash"
            type="text"
            value={verificationHash}
            onChange={(e) => setVerificationHash(e.target.value)}
            required
            pattern="[a-fA-F0-9]{64}"
            title="64-character hexadecimal string"
          />
          <button type="submit" className="action-button">
            Verify Hash
          </button>
        </form>
      ) : null}

      {hash && mode === 'encrypt' && (
        <ResultDisplay
          label="SHA-256 Hash"
          value={hash}
          isHash={true}
        />
      )}

      {hasVerified && result && mode === 'decrypt' && (
        <div className="verification-result">
          <h3>Verification Result:</h3>
          <p className={result.includes('✓') ? 'success' : 'failure'}>{result}</p>
          <p>Generated Hash: {hash}</p>
        </div>
      )}

    </div>
  );
}

export default SHA256;
