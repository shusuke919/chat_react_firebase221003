import React from 'react'
import Sidevar from '../components/Sidevar'
import Chat from '../components/Chat'
const Home = () => {
  return (
    <div className='home'>
      <div className="container">
      <Sidevar />
      <Chat />
      
      </div>
      
    </div>
  )
}

export default Home
