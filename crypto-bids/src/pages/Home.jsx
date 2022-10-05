import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavOptions from '../components/NavOptions'

function Home() {
  return (
    <div>
      <NavOptions />
      <h1>Crypto-Bids</h1>
    </div>
  )
}

export default Home