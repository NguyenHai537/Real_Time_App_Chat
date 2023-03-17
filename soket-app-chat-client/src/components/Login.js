
import '../css/UpdateUser.css';
import React, { useState, useRef } from "react";
import '../css/Login.css';
    import { Link, useNavigate, useParams } from 'react-router-dom'
    import '../App.css'
    import axios, { HttpStatusCode } from 'axios';

// Linh update Login
export default function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useState(
        {username: '',password: ''}
    )
    const handleInput = (key, value) => {
        const newVal = {...user, [key]: value};
        setUser(newVal);
        console.log(newVal)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:8080/signup", user)
          .then(res => {
            console.log(res.status)
            if(res.status === HttpStatusCode.Ok){
                let resp = res.data.username;
                navigate(`/chat/${resp}`)
            }
          })
          .catch(err => {
            console.log(err)
            throw err;
          });
    }

    return (
        <>
            <div className="joinOuterContainer">
                <div className="joinInnerContainer">
                    <h1 className="heading">Login</h1>
                    <div>
                        <input onChange={(e) => handleInput(e.target.name, e.target.value)} type="text" className="joinInput" id="loginun" name = 'username'placeholder="Username" />
                    </div>
                    <div>
                        <input onChange={(e) => handleInput(e.target.name, e.target.value)} type="password" className="joinInput mt-20" id="loginpw" name = 'password' placeholder="Password" />
                    </div>
                    <br></br>
                    <button className="w-100 btn btn-lg btn-primary" type="button" onClick={handleLogin}>Sign in</button>
                </div>
            </div>
        </>
    )
}

