import React from 'react'
import Buttons from '../components/Buttons'
import { FaDollarSign, FaShare, FaInfo, FaBuffer, FaMoneyBillWave, FaReceipt } from 'react-icons/fa'


// Home Page Component
function Home() {

    // Array of button objects
    const buttons = [{ id: 0, icon: <FaDollarSign />, text: 'Trade', destination: '/trade' }, { id: 1, icon: <FaShare />, text: 'Invites', destination: '/invitation' }, { id: 2, icon: <FaInfo />, text: 'About Us', destination: '/aboutUs' }, { id: 3, icon: <FaBuffer />, text: 'Deposit', destination: '/comingSoon' }, { id: 4, icon: <FaMoneyBillWave />, text: 'Withdrawal', destination: '/comingSoon' }, { id: 5, icon: <FaReceipt />, text: 'Records', destination: '/records' }]
    
  return (
    <div className="mx-auto">
        <h1 className="mb-5">Crypto-Bids</h1>
        <Buttons className="mb-5" buttons={buttons} />
    </div>
  )
}

export default Home