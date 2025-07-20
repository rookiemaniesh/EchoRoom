import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {createSocket, getSocket, setUsername as setGlobalUsername} from '../socket'
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const handleJoin = () => {
    if (!roomId) return toast.error("Room ID is required");
    if (!username) return toast.error("Username is required");
    setGlobalUsername(username);
    createSocket(roomId, username); // pass username
    navigate("/dashboard");

    // socket.onmessage = (e) => {
    //   toast.success(e.data); // success confirmation
    // };

    // socket.onerror = (e) => {
    //   console.error("Socket error:", e);
    //   toast.error("WebSocket error");
    // };
  };

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <Toaster />
      <h1 className='font-doto text-zinc-300 text-2xl'>Join a Room</h1>
      <input type="text"
        placeholder='RoomId'
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className='p-2 border border-zinc-300 rounded-md font-doto text-zinc-300 max-w-[70%]' />
      <input type="text"
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='p-2 border border-zinc-300 rounded-md font-doto text-zinc-300 max-w-[70%]' />
      <button
        onClick={handleJoin}
        className='p-1 px-4 border border-zinc-300 rounded-md text-zinc-300 font-doto hover:bg-zinc-600'>Join</button>
    </div>
  )
}

export default Join
