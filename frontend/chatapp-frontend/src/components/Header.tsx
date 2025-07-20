import React from 'react'
import { useNavigate } from 'react-router-dom'
import { disconnect } from '../socket'

const Header = ({RoomId}:{RoomId:String|null}) => {
  const navigate = useNavigate();

  const handleExit = () => {
    console.log("🚪 User exiting chat room");
    disconnect(); // Properly disconnect and reset state
    navigate('/');
  };

  return (
    <div>
      <div className='border border-dotted border-zinc-400 flex items-center justify-between p-2 rounded-lg mb-4 '>
        <div className='flex items-center'><img src="https://imgs.search.brave.com/MNfnb_MKamUhAPzaozvXwaKAItDpXwoB5WfbiYdMx-M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9naXRo/dWIuY29tL3RydW11/bGx5L3BmcF9nZW5l/cmF0b3IvcmF3L21h/aW4vZXhhbXBsZXMv/Z2l0aHViLnBuZw" alt=""  className='size-8 rounded-md'/>
        {/* <h1>{RoomId}</h1> */}
        <h1 className='text-xl pl-5 text-zinc-200 font-doto'>RoomId: {RoomId}</h1></div>
        <button 
          onClick={handleExit}
          className='bg-red-500 p-1 rounded-sm ml-5 px-4 font-doto cursor-pointer text-zinc-200 hover:bg-red-600 transition-colors'
        >
          Exit
        </button>
      </div>
    </div>
  )
}

export default Header
