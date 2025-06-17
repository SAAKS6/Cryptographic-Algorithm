import React from 'react';

const algorithms = [
  { id: 'caesar', name: 'Caesar Cipher' },
  { id: 'affine', name: 'Affine Cipher' },
  { id: 'vigenere', name: 'Vigenère Cipher' },
  { id: 'otp', name: 'One Time Pad' },
  { id: 'railfence', name: 'Rail Fence Cipher' },
  { id: 'playfair', name: 'Playfair Cipher' },
  { id: 'rsa', name: 'RSA Cipher' },
  { id: 'transposition', name: 'Transposition Cipher' },
  { id: 'sha256', name: 'SHA-256 Hash' }
];

function AlgorithmSelector({ onSelect, selectedAlgorithm }) {
  return (
    <div className="algorithm-selector">
      <h2>Select Algorithm</h2>
      <div className="algorithm-grid">
        {algorithms.map(alg => (
          <button
            key={alg.id}
            className={selectedAlgorithm === alg.id ? 'selected' : ''}
            onClick={() => onSelect(alg.id)}
          >
            {alg.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AlgorithmSelector;