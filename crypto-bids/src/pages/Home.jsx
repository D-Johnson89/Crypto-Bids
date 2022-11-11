import React, { useContext } from 'react'
import { UserContext } from '../util/userFuncs'
import Buttons from '../components/Buttons'
import { FaDollarSign, FaShare, FaInfo, FaBuffer, FaMoneyBillWave, FaReceipt } from 'react-icons/fa'


// Home Page Component
function Home() {
    // Create states and variables
    const user = useContext(UserContext)
    // Array of button objects
    const buttons = [{ id: 0, icon: <FaDollarSign />, text: 'Trade' }, { id: 1, icon: <FaShare />, text: 'Invites' }, { id: 2, icon: <FaInfo />, text: 'About Us' }, { id: 3, icon: <FaBuffer />, text: 'Deposit' }, { id: 4, icon: <FaMoneyBillWave />, text: 'Withdrawal' }, { id: 5, icon: <FaReceipt />, text: 'Records' }]
    
  return (
    <div>
        <h1>Crypto-Bids</h1>
        <Buttons buttons={buttons} />
    </div>
  )
}

export default Home