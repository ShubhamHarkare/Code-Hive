import React, { useEffect, useRef, useState } from 'react';
import Client from './Client.jsx';
import Codespace from './Codespace.jsx';
import initSocket from './Socket.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate
} from 'react-router-dom';

function Editor() {
  const [clients, setClients] = useState([]);
  const [theme,setTheme] = useState('dark');
  const [programmingLanguage, setProgrammingLanguage] = useState('python');
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef(null);
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const backedURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5555';
  //TODO: The below is used to make sure that I can run the code when I need to run the code
  const onCodeChange = useRef('');
  //Description: Function definition for handling errors
  const handleError = () => {
    toast.error('Socket Connection Failed');
    navigate('/');
  };

  //!This is the most important part of the code.
  useEffect(() => {
    const init = async () => {
      try {
        socketRef.current = await initSocket();
        setSocketConnected(true);

        socketRef.current.on('connect_error', err => {
          handleError(err);
        });
        socketRef.current.on('joined', ({ clients, username }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} has joined`);
          }
          setClients(clients);
        });

        socketRef.current.on('disconnected', ({ socketId, username }) => {
          toast.success(`${username} has left`);
          setClients(prev => {
            return prev.filter(client => client.socketId !== socketId);
          });
        });

        socketRef.current.on('init-language', (language) => {
          setProgrammingLanguage(language);
        });

        socketRef.current.on('language-change', (language) => {
          setProgrammingLanguage(language);
        });

        socketRef.current.emit('join', {
          roomId,
          username: location.state?.username
        });

      } catch (error) {
        handleError(error);
      }
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.off('joined');
        socketRef.current.off('disconnected');
        socketRef.current.off('init-language');
        socketRef.current.off('language-change');
        socketRef.current.disconnect();
      }
    };
  }, [roomId, location.state?.username, navigate]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  //Description: Handling the event when the Copy Room button is clicked
  const handleCopyRoom = async e => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID was copied');
    } catch (err) {
      toast.error('Cannot copy the RoomID');
    }
  };

  //Description: Code to remove user when they click on Leave Room
  const handleLeaveRoom = async () => {
    if (socketRef.current) {
      socketRef.current.emit('leave-room');
      navigate('/');
    }
  };

  //Description: Code to handle the change in programming language
  const changeProgrammingLanguage = lang => {
    if (socketRef.current) {
      socketRef.current.emit('language-change', {
        roomId,
        language: lang
      });
    }
  };
  //Description: Code to change the handling of theme
  const handleToggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  //Description: Code to handle changes in the code
  const handleRunCode = async() => {
    //! This is where I have to write the code to make sure that the code runs
    try {
      const response = await axios.post(`${backedURL}/api/execute`,{
        code: onCodeChange.current,
        language: programmingLanguage,
        input: ''
      });
      console.log(`Execution Complete: ${response.data}`);

      alert(`Status: ${response.data.status}\nOutput:\n${response.data.output || response.data.error}`);
    } catch (error) {
      console.error('Code execution failed', error);
      toast.error('Failed to run code. Check console for details.');
    }

  };

  return (
    <div className="container-fluid vh-100">
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container-fluid d-flex justify-content-between align-items-center px-3">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {programmingLanguage}
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  onClick={() => changeProgrammingLanguage('python')}
                  className="dropdown-item"
                >
                  Python3
                </button>
              </li>
              <li>
                <button
                  onClick={() => changeProgrammingLanguage('c++')}
                  className="dropdown-item"
                >
                  C++
                </button>
              </li>
              <li>
                <button
                  onClick={() => changeProgrammingLanguage('javascript')}
                  className="dropdown-item"
                >
                  JavaScript
                </button>
              </li>
            </ul>
          </div>
          <span className="navbar-brand fw-semibold">
            Code Hive {!socketConnected && '(Connecting...)'}
          </span>
          <button
            onClick={handleToggleTheme}
            type="button"
            className="btn btn-outline-secondary d-flex align-items-center gap-2 px-3 py-2 rounded-3">
            <span className="fs-6">🌙</span>
            <span className="fw-medium small">Change Theme</span>
          </button>
          <button
            onClick={handleRunCode}
            className="btn btn-warning btn-sm px-4 fw-semibold"
            type="button"
          >
            ▶ Run
          </button>
        </div>
      </nav>
      <div className="row h-100">
        <div
          className="col-md-2 bg-dark text-light d-flex flex-column h-100"
          style={{ boxShadow: '2px 0 4px rgba(0,0,0,0.1)' }}
        >
          <p className="text-light">Members ({clients.length})</p>
          <div className="d-flex flex-column overflow-auto">
            {/* CLIENT */}
            {clients.map(client => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>

          <div className="mt-auto">
            <button
              onClick={handleCopyRoom}
              className="btn btn-success mt-2 mb-2 px-3 btn-block"
            >
              Copy Room ID
            </button>
            <button
              onClick={handleLeaveRoom}
              className="btn btn-danger mt-2 mb-2 px-3 btn-block"
            >
              Leave Room
            </button>
          </div>
        </div>
        <div className="col-md-10 text-light d-flex flex-column h-100">
          {socketConnected ? (
            <Codespace
              language={programmingLanguage}
              socketRef={socketRef}
              roomId={roomId}
              theme = {theme}
              onCodeChange = {(code) => {
                onCodeChange.current = code;
              }}
            />
          ) : (
            <div style={{ padding: '20px' }}>
              <p>Connecting to room...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editor;