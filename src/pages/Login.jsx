import React from 'react'
import "../style.scss";
import Add from "../img/addAvatar.png";

const Login = () => {
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Lama chat</span>
        <span className='title'>Login</span>
        <form>
          <input type="email" placeholder='email'></input>
          <input type="password" placeholder='password'></input>
          <button>Sign in</button>
        </form>
        <p>You do have an account? Regisrer</p>
      </div>
      
    </div>
  )
}

export default Login
