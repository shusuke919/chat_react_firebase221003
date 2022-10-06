import React, { useState } from 'react'
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
const [err, setErr] = useState(false)
const navigate = useNavigate();
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

  //DBへユーザー情報を格納するhttps://firebase.google.com/docs/firestore/manage-data/add-data

  try{
    //ユーザー登録
    const res = await createUserWithEmailAndPassword(auth, email, password);

    //画像の保存
    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);
    await uploadBytesResumable(storageRef, file).then(() => {
    getDownloadURL(storageRef).then(async (downloadURL) => {
    try {


      //updateProfile　firebaseの関数　authデータ更新
       await updateProfile(res.user,{
        displayName,
        photoURL:downloadURL,
       });

       //ユーザーをfirestoreに保存する(できない)
       //https://www.youtube.com/watch?v=k4mjF4sPITE&t=4355s
       //https://codingshiksha.com/react/react-js-firebase-auth-project-to-build-facebook-group-chat-messenger-clone-using-context-api-redux/
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "usersChats", res.user.uid), {});
      navigate("/")
      

    } catch (err) {
      console.log(err);
     
    }
  });
});

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
        <p>You do have an account? <Link to="/login">login</Link></p>
      </div>
      
    </div>
  )
}

export default Register
