import React, { useContext } from 'react'
import { UserContext } from '../util/userFuncs'

// Home Page Component
function Home() {
    // Create states and variables
    const user = useContext(UserContext)
    
  return (
    <div>
      <h1>Crypto-Bids</h1>
    </div>
  )
}

export default Home