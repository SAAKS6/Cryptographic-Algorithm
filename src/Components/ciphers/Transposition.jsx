import React, { useState } from 'react';
import {
  transpositionEncrypt,
  transpositionDecrypt
} from '../../utils/cryptoUtils.js';
import InputField from '../common/InputField';
import ResultDisplay from '../common/ResultDisplay';

function Transposition({ mode }) {
  const [text, setText] = useState('');
  const [key, setKey] = useState('COLUMN');
  const [variant, setVariant] = useState('column');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [grid, setGrid] = useState([]);
  const [steps, setSteps] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!key.match(/^[a-zA-Z]+$/)) {
      setError('Key must contain only alphabetic characters');
      return;
    }

    try {
      if (mode === 'encrypt') {
        setResult(transpositionEncrypt(text, key, variant, setGrid, setSteps));
      } else {
        setResult(transpositionDecrypt(text, key, variant, setGrid, setSteps));
      }
      console.log('Grid state:', grid); // Debug grid contents
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to render the grid as a table
  const renderGrid = () => {
    if (grid.length === 0) return null;
    return (
      <table style={{ borderCollapse: 'collapse', marginTop: '10px' }}>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    border: '1px solid #ccc',
                    padding: '5px',
                    textAlign: 'center',
                    minWidth: '20px',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="cipher-container">
      <h2>
        Transposition Cipher - {variant === 'column' ? 'Column' : 'Row'} -{' '}
        {mode === 'encrypt' ? 'Encryption' : 'Decryption'}
      </h2>

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

        <div
          style={{
            marginTop: '18px',
            marginBottom: '18px',
            fontSize: '20px'
          }}
        >
          <h5>Variant </h5>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            style={{
              padding: '8px',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            <option value="column">Column Transposition</option>
            <option value="row">Row Transposition</option>
          </select>
        </div>

        <button type="submit" className="action-button">
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>
      </form>

      {grid.length > 0 && (
        <div className="grid-container">
          <h3>Transposition Grid</h3>
          {renderGrid()}
        </div>
      )}

      {steps.length > 0 && (
        <div className="steps-container">
          <h3>Processing Steps</h3>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      {result && <ResultDisplay label="Result" value={result} />}
    </div>
  );
}

export default Transposition;