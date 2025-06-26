import React from 'react'

const Join = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1 className='font-doto text-zinc-300 text-2xl'>Join a Room</h1>
      <input type="text" placeholder='RoomId' className='p-2 border border-zinc-300 rounded-md font-doto text-zinc-300 max-w-[70%]' />
      <button className='p-1 px-4 border border-zinc-300 rounded-md text-zinc-300 font-doto hover:bg-zinc-600'>Join</button>
    </div>
  )
}

export default Join
