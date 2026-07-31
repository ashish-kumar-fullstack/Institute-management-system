import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Home from './pages/Public/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App