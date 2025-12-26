import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import initSocket from './Socket';
import { useLocation, useParams } from 'react-router-dom';

function Codespace() {
  const [code, setCode] = useState('# Write your Python code here');
  const editorRef = useRef(null);
  const isRemoteUpdate = useRef(false);
  const { roomId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      editorRef.current = await initSocket();

      editorRef.current.emit('join', {
        roomId,
        username: location.state?.username
      });

      editorRef.current.on('init-code', initialCode => {
        isRemoteUpdate.current = true;
        setCode(initialCode);
      });

      editorRef.current.on('code-change', code => {
        isRemoteUpdate.current = true;
        setCode(code);
      });
    };

    init();
    return () => {
      if (editorRef.current) {
        editorRef.current.off('init-code');
        editorRef.current.off('code-change');
        editorRef.current.disconnect();
      }
    };
  }, []);

  const handleChange = value => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }

    setCode(value);
    editorRef.current.emit('code-change', {
      roomId,
      code: value
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'left' }}>
      <CodeMirror
        value={code}
        height="100vh"
        extensions={[python()]}
        onChange={handleChange}
        theme="dark"
        autoCorrect="true"
      />
    </div>
  );
}

export default Codespace;
