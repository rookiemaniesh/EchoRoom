import React, { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
