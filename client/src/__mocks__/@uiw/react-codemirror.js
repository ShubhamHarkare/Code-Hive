import React from 'react';

const CodeMirror = ({ value, onChange }) => (
  <textarea
    data-testid="codemirror"
    value={value}
    onChange={e => onChange && onChange(e.target.value)}
  />
);

export default CodeMirror;
