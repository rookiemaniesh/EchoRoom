import React from 'react'

const Input = ({placeholder}:{placeholder:string}) => {
  return (
    <div>
      <input type="text" placeholder={placeholder} className='p-4 bg-zinc-900 border border-zinc-500 w-full text-zinc-100' />
    </div>
  )
}

export default Input
