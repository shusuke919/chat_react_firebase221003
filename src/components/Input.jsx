import React from 'react'
import Img from "../img/img.png"
import Aattch from "../img/attach.png"

const input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type something'></input>
        <div className="send">
          <img src={Aattch} alt="" />
          <input type='file' style={{display:"none"}} id="file"></input>
          <label htmlFor='file'>
            <img src={Img} alt="" />
          </label>
          <button>send</button>
       </div>
     
    </div>
  )
}

export default input
