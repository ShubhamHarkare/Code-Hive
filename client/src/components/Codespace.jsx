import React, { useEffect, useMemo, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { githubLight } from '@uiw/codemirror-theme-github';


function Codespace({ language, socketRef, roomId, theme, onCodeChange }) {
  const editorTheme = useMemo(() => {
    return theme === 'dark' ? oneDark : githubLight;
  },[theme]);
  const isRemoteUpdate = useRef(false);
  const [code, setCode] = useState('');
  const lastEmittedCode = useRef('');
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

  // -------- Language Extensions (Memoized) --------
  const extensions = useMemo(() => {
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
  }, [language]);

  // -------- Socket Listeners --------
  useEffect(() => {
    if (!socketRef?.current) {
      return;
    }

    const handleInitCode = (initialCode) => {
      isRemoteUpdate.current = true;
      setCode(initialCode || '');
      lastEmittedCode.current = initialCode || '';
      if (onCodeChange) {
        onCodeChange(initialCode || '');
      }
    };

    const handleCodeChange = (incomingCode) => {
      isRemoteUpdate.current = true;
      setCode(incomingCode);
      lastEmittedCode.current = incomingCode;
    };

    socketRef.current.on('init-code', handleInitCode);
    socketRef.current.on('code-change', handleCodeChange);

    return () => {
      if (socketRef.current) {
        socketRef.current.off('init-code', handleInitCode);
        socketRef.current.off('code-change', handleCodeChange);
      }
    };
  }, [socketRef, roomId]);

  // -------- Local Code Change --------
  const handleChange = (value) => {
    // If this was triggered by a remote update, ignore it
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }
    setCode(value);
    lastEmittedCode.current = value;
    if (onCodeChange) {
      onCodeChange(value);
    }

    if (socketRef?.current) {
      socketRef.current.emit('code-change', {
        roomId,
        code: value
      });
    };
  };

  return (
    <div style={{ padding: '20px', textAlign: 'left' }}>
      <div style={{ marginBottom: '10px', color: '#888888ff', fontSize: '12px' }}>
        Debug: Room={roomId}, Language={language}, CodeLength={code.length}
      </div>
      <CodeMirror
        value={code}
        height="100vh"
        extensions={extensions}
        onChange={handleChange}
        theme={editorTheme}
        placeholder={getPlaceholder()}
      />
    </div>
  );
}

export default Codespace;