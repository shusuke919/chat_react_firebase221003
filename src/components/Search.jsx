

import { useContext, useState } from "react";
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  ///ユーザーの名前を状態管理
 const [username, setUserName] = useState("");
//  ユーザーを状態管理
 const [user, setUser] =useState(null)
//  エラーを状態管理
 const [err, setErr]=useState(false)

 const {currentUser} = useContext(AuthContext)


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

 const handleSelect = async () => {
  //check whether the group(chats in firestore) exists, if not create
  const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      //create a chat in chats collection
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      //create user chats
      await updateDoc(doc(db, "usersChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "usersChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  } catch (err) {}
setUser(null);
setUserName("");
  
};

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" onKeyDown={handleKey} onChange={e => setUserName(e.target.value)} value={username}></input>
      </div>
      {err && <span>User not found</span>}
    {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL}alt=''></img>
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>} 
    </div>
  )
}

export default Search
