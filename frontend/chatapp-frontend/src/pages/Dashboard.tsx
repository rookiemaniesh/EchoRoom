import { useState } from 'react'

import '../App.css'
import Input from '../components/Input'
import Header from '../components/Header'
import MessageBox from '../components/MessageBox'

function Dashboard() {
  

  return (
  <>
  <div className='min-h-screen flex items-center justify-center bg-black'>
   <div className='bg-zinc-900 px-4 pt-4 pb-3 rounded-xl max-w-xl  w-full border-3 border-zinc-500 border-dashed'>
    <Header RoomId={"A%VB&&"}/>
<div className="flex flex-col items-start w-full">
  <MessageBox message="Hello!bfsakcbkkkkk" author="Alice" isMe={false} />
  <MessageBox message="Hi!"  isMe={true} />
</div>

    <Input placeholder='message' />
   </div>
  </div>
  </>
  )
}

export default Dashboard
