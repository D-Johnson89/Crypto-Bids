import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Home Page Component
function Home() {
    // Create states and variables
    const location = useLocation()
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        if(isAuthenticated()) {
            const member = {
                username: location.state.username,
                email: location.state.email,
                balance: location.state.balance,
            }
    
            setUser(member)
        } else {
            setUser(null)
        }
        
    }, [])
    //console.log(user)
  return (
    <div>
      <h1>Crypto-Bids</h1>
    </div>
  )
}

export default Home