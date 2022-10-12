import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NavOptions from './components/NavOptions'
import LogOptions from './components/LogOptions'
import Dashboard from './components/Dashboard'
import AboutUs from './pages/AboutUs'
import { RequireAuth } from 'react-auth-kit'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/logoptions' element={<LogOptions />} />
      <Route path='/dashboard' element={
            <RequireAuth loginPath='/login' >
                <Dashboard />
            </RequireAuth>
        } />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/navoptions' element={<NavOptions />} />
      <Route path='/aboutUs' element={<AboutUs />} />
    </Routes>
  )
}

export default App
