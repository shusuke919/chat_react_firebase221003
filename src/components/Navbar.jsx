import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {

  const {currentUser} = useContext(AuthContext);
  return (
    <div className='navbar'>
      <span className='logo'>lama chat</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt=""></img>
        <span>{currentUser.displayName}</span>
        {/* サインアウと */}
        <button onClick={() =>signOut(auth) }>logOut</button>
      </div>
    </div>
  )
}

export default Navbar
