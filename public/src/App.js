import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Chat, Login, Register } from './pages'
import './app.css'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={
          <div className='gradient_bg'>
            <Register />
          </div>
        } />
        <Route path="/login" element={
          <div className="gradient_bg">
            <Login />
          </div>
        } />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App