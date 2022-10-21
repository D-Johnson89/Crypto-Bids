import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import NavOptions from '../components/NavOptions'
import { useIsAuthenticated } from 'react-auth-kit'

// Home Page Component
function Home() {
    // Create states and variables
    const location = useLocation()
    const [user, setUser] = useState('')
    const isAuthenticated = useIsAuthenticated()
    //const [loading, setLoading] = useState(false)
    //const [error, setError] = useState(null)

    useEffect(() => {
        if(isAuthenticated()) {
            const member = {
                username: location.state.username,
                email: location.state.email,
                balance: location.state.email,
            }
    
            setUser(member)
        } else {
            setUser(null)
        }
        
    }, [user])

  return (
    <div>
      <NavOptions user={user} />
      
      <h1>Crypto-Bids</h1>
    </div>
  )
}

export default Home