import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
          .post("http://localhost:8080/login", user)
          .then(res => {
            console.log(res.status)
            if(res.status === HttpStatusCode.Ok){
                let resp = res.data.username;
                navigate(`/chat/${resp}`)
            }
          })
          .catch(err => {
            alert("Username hoac password bi sai.");
            console.log(err)
            throw err;
          });
    }

    return (
        <>
            <div className="container text-center">
            <h1 className="h1 mb-3 fw-large" style={{marginTop:'2rem'}}>ChatApp</h1>
                <div className="container d-flex align-items-center text-center">
                    <div className="form-signin">
                        <form>
                        <div className="form-floating">
                            <input onChange={(e) => handleInput(e.target.name, e.target.value)} type="text" className="form-control username" id="loginun" name = 'username'placeholder="Username" />
                            <label>Username</label>
                        </div>
                        <div className="form-floating">
                            <input onChange={(e) => handleInput(e.target.name, e.target.value)} type="password" className="form-control password" id="loginpw" name = 'password' placeholder="Password" />
                            <label>Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="button" onClick={handleLogin}>Sign in</button>
                        </form>
                    <Link to = '/signup'>
                        <button className="w-100 btn btn-lg btn-primary" style={{backgroundColor: '#2CD551', marginTop:'1rem'}} type="button">Sign Up</button>
                    </Link>
                    <p className="mt-5 mb-3 text-muted">© C09-2023</p>
                    </div>
                 </div>
            </div>
        </>
    )
}