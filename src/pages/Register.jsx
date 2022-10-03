import React, { useState } from 'react'
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


const Register = () => {
const [err, setErr] = useState(false)
  // 非同期処理
 const handleSubmit =async (e) =>{
  // preventDefault勝手にイベントするのを防ぐ
  e.preventDefault()
  const displayName = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;
  // 最初のファイル取得だから取得だから配列が０
  // authに写真や画像を直接は入れられない
  const file = e.target[3].files[0];

  //認証で参考 https://firebase.google.com/docs/auth/web/password-auth
  // upload img  https://firebase.google.com/docs/storage/web/upload-files
  // try-catch文は、プログラム中で例外が発生するか試して(try)、例外が発生したら捕まえて(catch)、何かしらの処理を行いたい場合に使います。

  try{
    const res = createUserWithEmailAndPassword(auth, email, password)
  }catch(err){
     setErr(true);
  }
 
    


 };


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
          {/* err && 左側がtrueであれば右側を実行する */}
          {err && <span>something went wrong</span>}
        </form>
        <p>You do have an account? Login</p>
      </div>
      
    </div>
  )
}

export default Register
