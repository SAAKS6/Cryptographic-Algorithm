import React, { useState } from 'react';
import AlgorithmSelector from './components/AlgorithmSelector';
import CaesarCipher from './components/ciphers/CaesarCipher';
import AffineCipher from './components/ciphers/AffineCipher';
import VigenereCipher from './components/ciphers/VigenereCipher';
import OneTimePad from './components/ciphers/OneTimePad';
import RailFence from './components/ciphers/RailFence';
import Playfair from './components/ciphers/Playfair';
import RSA from './components/ciphers/RSA';
import Transposition from './components/ciphers/Transposition';
import SHA256 from './components/ciphers/SHA256';
import './App.css';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [mode, setMode] = useState('encrypt');

  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  const renderAlgorithmComponent = () => {
    switch (selectedAlgorithm) {
      case 'caesar':
        return <CaesarCipher mode={mode} />;
      case 'affine':
        return <AffineCipher mode={mode} />;
      case 'vigenere':
        return <VigenereCipher mode={mode} />;
      case 'otp':
        return <OneTimePad mode={mode} />;
      case 'railfence':
        return <RailFence mode={mode} />;
      case 'playfair':
        return <Playfair mode={mode} />;
      case 'rsa':
        return <RSA mode={mode} />;
      case 'transposition':
        return <Transposition mode={mode} />;
      case 'sha256':
        return <SHA256 mode={mode} />;
      default:
        return <div className="instruction">Please select an algorithm</div>;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Cryptographic Algorithms Console</h1>
        <p className="app-subtitle">Explore various cryptographic algorithms</p>
      </header>

      <AlgorithmSelector
        onSelect={handleAlgorithmSelect}
        selectedAlgorithm={selectedAlgorithm}
      />

      {selectedAlgorithm && (
        <div className="mode-selector">
          <button
            className={mode === 'encrypt' ? 'active' : ''}
            onClick={() => handleModeChange('encrypt')}
          >
            Encrypt
          </button>
          <button
            className={mode === 'decrypt' ? 'active' : ''}
            onClick={() => handleModeChange('decrypt')}
          >
            Decrypt
          </button>
        </div>
      )}

      <div className="algorithm-container">
        {renderAlgorithmComponent()}
      </div>
    </div>
  );
}

export default App;