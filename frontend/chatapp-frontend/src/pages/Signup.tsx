

import '../App.css'
import Create from '../components/Create'

import Join from '../components/Join'


function Signup() {
  

  return (
  <>
  <div className='min-h-screen flex items-center justify-center bg-black'>
   <div className='flex justify-between bg-zinc-900 p-8 py-12 rounded-xl max-w-xl  w-full border-3 border-zinc-500 border-dashed'>
   <Join/>
    <div className="border-l border-dashed border-gray-400 h-50 "></div>
   <Create/>

    
   </div>
  </div>
  </>
  )
}

export default Signup
