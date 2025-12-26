import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
import {useNavigate} from 'react-router-dom'
function HomePage() {
    const [roomId,setRoomId] = useState("")
    const [username,setUsername] = useState("")
    const navigate = useNavigate()
    const generateUUID = (e) => {
        e.preventDefault();
        const id = uuid();
        setRoomId(id)
        toast.success("Room Id is generated")

    }
    const joinRoom = () => {
        if (!roomId || !username){
            toast.error("Both the fields are required");
            return;
        }
        navigate(`/editor/${roomId}`,{
            state:{username}
        })
        toast.success("Room is created")


    }
  return (
    <div className='container-fluid'>
      <div className="row justify-content-center align-items-center min-vh-100 ">
        
        <div className="col-12 col-md-6">
            <div className="card shadow-sm p-2 mb-5 bg-secondary rounded">
                <div className="card-body text-center bg-dark">
                    <div className="form-group">
                        <h4 className='text-light'>Enter RoomId</h4>
                        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} type="text" className='form-control mb-2' placeholder='Enter roomId' />
                        <input value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" className='form-control mb-2' placeholder='Enter username' />
                        <button onClick={joinRoom} className='btn btn-success btn-lg btn-block '>JOIN</button>
                        <p className='mt-3 text-light'>Don't have a room? <span 
                        className='text-success pt-2'
                        style={{cursor:'pointer'}}
                        onClick={generateUUID}
                        >Create Room</span></p>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
