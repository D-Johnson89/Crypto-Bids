import React from 'react'
import { useRoutes } from 'react-router'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NavOptions from './components/NavOptions'
import AboutUs from './pages/AboutUs'
import AddressBook from './pages/AddressBook'
import AddAddress from './pages/AddAddress'
import AuthCard from './pages/AuthCard'
import { Suspense } from 'react'

const index = [{path: '/', element:<NavOptions />, children: [{index: true, element: <Home />}, {path: '/login', element: <Login />}, {path: '/register', element: <Register />}, {path: '/aboutUs', element: <AboutUs />}, {path: '/addressBook', element: <AddressBook />}, {path: '/addAddress', element: <AddAddress />}, {path: '/authCard', element: <AuthCard />},]}]

function App() {
    
    let element = useRoutes(index)
    
    return (
        <Suspense fallback={<>Loading</>}>
            {element}
        </Suspense>
    )
}

export default App
