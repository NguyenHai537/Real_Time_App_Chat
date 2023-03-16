import React, { useState, useRef } from "react";
import {useNavigate} from "react-router-dom"
import socketIOClient from "socket.io-client";
import './Login.css';

export default function Login() {






  

    //Code cua Hai, a Tung sua thi dung xoa nhe
    const [name, setName] = useState('');
    const navigate = useNavigate();
    function HandleSubmit (){
      navigate(`/chat/${name}`);
    }

  
    return (
      // Khuc nay a Tung xoa di, them code cua a vao
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Login</h1>
          <div>
            <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
          </div>
          <div>
            <input placeholder="Password" className="joinInput mt-20" type="text" />
          </div>
            <button className={'button mt-20'} type="submit" onClick={HandleSubmit}>Sign In</button>      
        </div>
      </div>
    );
  }
