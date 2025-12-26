import React, { useEffect, useRef, useState } from 'react'
import Client from './Client.jsx'
import Codespace from './Codespace.jsx'
import initSocket from './Socket.js'
import toast from 'react-hot-toast';
import {useNavigate,useLocation,useParams, Navigate} from 'react-router-dom'
function Editor() {
    const [clients,setClients] = useState([])
    const socketRef = useRef(null);
    const {roomId} = useParams()  
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
      const init = async () => {
        socketRef.current = await initSocket();
        socketRef.current.on('connect_error',(err) => handleError(err))
        socketRef.current.on('connect_failed',(err) => handleError(err))
        socketRef.current.on('joined',({clients,username,socketId}) => {
        if(username !== location.state?.username){
          toast.success(`${username} has joined`);
        }
        
        
        setClients(clients);
      })
        socketRef.current.emit('join',{
          roomId,
          username:location.state?.username})

      //Description: Write code for disconnecting users
      socketRef.current.on('disconnected', ({ socketId, username }) => {
      console.log('DISCONNECTED EVENT RECEIVED:', socketId, username);
      toast.success(`${username} has left`);
      setClients((prev) => {
        console.log('Previous clients:', prev);
        const newClients = prev.filter((client) => client.socketId !== socketId);
        console.log('New clients after filter:', newClients);
        return newClients;
        });
      });

      
      

    }

      
      
      init();
      return () => {
      socketRef.current.disconnect();
      socketRef.current.off('joined');
      socketRef.current.off('disconnect')
      }
    },[])
    
    if (!location.state) {
      return <Navigate to='/' />
    }
    const handleError = (e) => {
      console.log(`Socket error => ${e}`);
      toast.error("Socket Connection Failed")
      navigate(`/`)
      
    }
    //Description: Handling the event when the Copy Room button is clicked
    const handleCopyRoom = async (e) => {
      e.preventDefault();
      try{
        await navigator.clipboard.writeText(roomId);
        toast.success("Room ID was copied")
      }catch (err) {
        toast.error("Cannot copy the RoomID")
      }
    }
    //Description: Code to remove user when they click on Leave Room
    const handleLeaveRoom = async(e) => {
      if(socketRef.current)
      {
        socketRef.current.emit("leave-room");
        navigate('/')
      }
    }

    
  return (
    <div className='container-fluid vh-100'>
      <div className="row h-100">
        <div className="col-md-2 bg-dark text-light d-flex flex-column h-100" style={{boxShadow:"2px 0 4px rgba(0,0,0,0.1)"}}>
            {/* TODO: Enter Client list container */}
            <p className='text-light'>Members</p>
             <div className="d-flex flex-column overflow-auto">
                {/* CLIENT */}
                {clients.map((client) =>(
                    <Client key={client.socketId} username={client.username} />
                ))}
             </div>

            <div className="mt-auto">
                <button onClick={handleCopyRoom} className='btn btn-success mt-2 mb-2 px-3 btn-block'>Copy Room ID</button>
                <button onClick={handleLeaveRoom} className='btn btn-danger mt-2 mb-2 px-3 btn-block'>Leave Room</button>
            </div>
        </div>
        <div className="col-md-10 text-light d-flex flex-column h-100">
            <Codespace/>
        </div>
      </div>
    </div>
  )
}

export default Editor
