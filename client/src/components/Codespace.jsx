import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';

function Codespace({ language, socketRef, roomId }) {
  const isRemoteUpdate = useRef(false);
  const getPlaceholder = () => {
    switch (language) {
    case 'python':
      return '# Write your Python code here';
    case 'c++':
      return '// Write your C++ code here';
    case 'javascript':
      return '// Write your JavaScript code here';
    default:
      return '# Write your code here';
    }
  };
  const [code, setCode] = useState(getPlaceholder());
  const getLanguageExtension = () => {
    switch (language) {
    case 'python':
      return [python()];
    case 'c++':
      return [cpp()];
    case 'javascript':
      return [javascript()];
    default:
      return [python()];
    }
  };

  useEffect(() => {
    if (!socketRef.current) {
      return;
    };

    socketRef.current.on('init-code', initialCode => {
      isRemoteUpdate.current = true;
      setCode(initialCode);
    });

    socketRef.current.on('code-change', code => {
      isRemoteUpdate.current = true;
      setCode(code);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off('init-code');
        socketRef.current.off('code-change');
      }
    };
  }, [socketRef, roomId]);

  const handleChange = value => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }

    setCode(value);
    if (socketRef.current) {
      socketRef.current.emit('code-change', {
        roomId,
        code: value
      });
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'left' }}>
      <CodeMirror
        value={code}
        height="100vh"
        extensions={getLanguageExtension()}
        onChange={handleChange}
        theme="dark"
        autoCorrect="true"
      />
    </div>
  );
}

export default Codespace;