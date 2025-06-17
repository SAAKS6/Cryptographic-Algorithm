import React from 'react';

function ResultDisplay({ label, value, isHash }) {
  return (
    <div className="result-display">
      <h3>{label}:</h3>
      {isHash ? (
        <div className="hash-value">
          <code>{value}</code>
          <p className="hash-length">Length: {value.length} characters (256 bits)</p>
        </div>
      ) : (
        <div className="result-value">
          {value}
        </div>
      )}
    </div>
  );
}

export default ResultDisplay;