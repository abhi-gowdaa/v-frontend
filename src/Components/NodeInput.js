import React, { useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';

const NodeInput = ({ label, currName, handleNameChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [currName]);

  return (
    <div style={{ marginBottom: '8px' }}>
      <label
        style={{
          fontSize: '12px',
          display: 'block',
          marginBottom: '4px',
          fontWeight: '500',
        }}
      >
        {label}
      </label>
      <TextField
        multiline
        rows={1}
        value={currName}
        onChange={handleNameChange}
        inputRef={inputRef}
        variant="outlined"
        style={{
          width: '100%',
          fontSize: '12px',
          fontFamily: 'monospace',
          background: 'white',
        }}
        InputProps={{
          style: {
            padding: '6px',
          },
        }}
      />
    </div>
  );
};

export default NodeInput;