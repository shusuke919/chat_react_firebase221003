

import { useState } from "react";
import { db } from '../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

const Search = () => {
  ///ユーザーの名前を状態管理
 const [username, setUserName] = useState("");
//  ユーザーを状態管理
 const [user, setUser] =useState(null)
//  エラーを状態管理
 const [err, setErr]=useState(false)


///ユーザーの検索と表示  https://firebase.google.com/docs/firestore/query-data/queries
 const handleSearch =async () => {
  const q = query(
    collection(db, "users"),
    where("displayName", "==", username)
  );
try{
  const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  setUser(doc.data())

});
}catch(err){
  setErr(true);
}
 };

 const handleKey = (e) =>{
  e.code === "Enter" && handleSearch();
  
 }
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" onKeyDown={handleKey} onChange={e => setUserName(e.target.value)}></input>
      </div>
      {err && <span>User not found</span>}
    {user && <div className="userChat">
        <img src={user.photoURL}alt=''></img>
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>} 
    </div>
  )
}

export default Search
