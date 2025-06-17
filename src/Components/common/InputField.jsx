import React from 'react';

function InputField({ label, type, value, onChange, required, min, max, pattern, title, info }) {
  return (
    <div className="input-field">
      <label>
        {label}
        {info && <span className="info"> ({info})</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          max={max}
          pattern={pattern}
          title={title}
        />
      )}
    </div>
  );
}

export default InputField;