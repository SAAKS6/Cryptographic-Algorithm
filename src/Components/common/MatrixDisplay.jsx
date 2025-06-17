import React from 'react';

function MatrixDisplay({ matrix }) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div className="matrix-display">
      <table>
        <thead>
          <tr>
            <th></th>
            {alphabet.split('').map((char, index) => (
              <th key={index}>{char}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th>{alphabet[rowIndex]}</th>
              {row.map((char, colIndex) => (
                <td key={colIndex}>{char}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MatrixDisplay;