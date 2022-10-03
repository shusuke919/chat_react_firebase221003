import React from 'react'
import "../style.scss";
import Add from "../img/addAvatar.png";


const Register = () => {
 const handleSubmit = (e) =>{
  // preventDefault勝手にイベントするのを防ぐ
  e.preventDefault()
  console.log(e.target[2].value)
 }


  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Lama chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='display name'></input>
          <input type="email" placeholder='email'></input>
          <input type="password" placeholder='password'></input>
          {/* ファイル選択を消す方法 */}
          <input style={{display:"none"}} type="file" id="file"></input>
            <label htmlFor="file">
              <img src={Add} alt=''></img>
              <span>Add anavatar</span>
            </label>
            
           
         
          <button>Sign up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
      
    </div>
  )
}

export default Register
