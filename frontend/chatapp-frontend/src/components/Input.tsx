import React from 'react'
import { SendIcon } from '../assets/send'

const Input = ({placeholder}:{placeholder:string}) => {
  return (
    <div className='flex items-center gap-2  mt-4'>
      <input type="text" placeholder={placeholder} className='p-2 bg-zinc-900 border border-zinc-500 w-full text-zinc-200 rounded-lg font-doto' />
      <button className='bg-zinc-500 p-2 rounded-lg hover:bg-zinc-400'><SendIcon/></button>
    </div>
  )
}

export default Input
