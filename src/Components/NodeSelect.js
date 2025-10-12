import React from 'react';

const NodeSelect = ({ label, type, handleTypeChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>
      <span style={{ marginBottom: '6px', fontWeight: '500', color: '#222' }}>{label}</span>
      <select
        value={type}
        onChange={handleTypeChange}
        style={{
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          backgroundColor: '#fff',
          fontSize: '14px',
          outline: 'none',
          cursor: 'pointer',
          transition: 'border 0.2s',
        }}
        onFocus={(e) => (e.target.style.border = '1px solid #007BFF')}
        onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
      >
        <option value="Text">Text</option>
        <option value="File">Image</option>
      </select>
    </div>
  );
};

export default NodeSelect;
