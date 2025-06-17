import React from 'react';

function GridDisplay({ grid, keyText }) {
  return (
    <div className="grid-display">
      <table>
        <thead>
          <tr>
            <th>Row</th>
            {keyText.split('').map((char, index) => (
              <th key={index}>{char}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex}</td>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GridDisplay;