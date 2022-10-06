import React from 'react'
import "../style.scss";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {

  const [err, setErr] = useState(false)
  const navigate = useNavigate();
    // 非同期処理
   const handleSubmit =async (e) =>{
    // preventDefault勝手にイベントするのを防ぐ
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    
  
    //認証で参考 https://firebase.google.com/docs/auth/web/password-auth
    // upload img  https://firebase.google.com/docs/storage/web/upload-files
    // try-catch文は、プログラム中で例外が発生するか試して(try)、例外が発生したら捕まえて(catch)、何かしらの処理を行いたい場合に使います。
  
    //DBへユーザー情報を格納するhttps://firebase.google.com/docs/firestore/manage-data/add-data
  
    try{
      signInWithEmailAndPassword(auth, email, password)
      navigate("/")
  
    }catch(err){
       setErr(true);
    }
   };


  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Lama chat</span>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='email'></input>
          <input type="password" placeholder='password'></input>
          <button>Sign in</button>
          {err && <span>something went wrong</span>}
        </form>
        <p>You do have an account? <Link to="/register">Regisrer</Link></p>
      </div>
      
    </div>
  )
}

export default Login
