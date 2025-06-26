import { useState } from 'react'

import './App.css'
import Input from './components/Input'

function App() {
  

  return (
  <>
  <div className='min-h-screen flex items-center justify-center bg-black'>
   <div className='bg-zinc-900 p-8 rounded-xl max-w-lg w-full border-3 border-zinc-500 border-dashed'>
    <Input placeholder='Type your message here...' />
   </div>
  </div>
  </>
  )
}

export default App
