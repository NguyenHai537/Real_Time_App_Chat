
import '../css/UpdateUser.css';
import React, { useState, useRef } from "react";
import '../css/Login.css';
    import { Link, useNavigate, useParams } from 'react-router-dom'
    import '../App.css'
    import axios, { HttpStatusCode } from 'axios';

// a Tùng sửa login
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
// vào backend sửa Controller /signup sang /signin
    const handleSignin = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:8080/signin", user)
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

    const handleSignup =(e) => {
        alert("Chưa làm")
    }
//anh Tùng sửa giao diện
    return (
        <>
<body>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
          <div class="card-img-left d-none d-md-flex">

          </div>
          <div class="card-body p-4 p-sm-5">
            <h1 class="card-title text-center mb-1 fw-light fs-1" style={{paddingBottom: '1em', fontWeight: 'bold', color:'white'}}>chatapp</h1>
            <form>

              <div class="form-floating mb-3">
                <input type="text" className="form-control" onChange={(e) => handleInput(e.target.name, e.target.value)}  id="loginun" name = 'username' placeholder='HEHE' required autofocus/>
                <label for="floatingInputUsername">Tên đăng nhập</label>
              </div>

              <div class="form-floating mb-3">
                <input type="password" className="form-control" onChange={(e) => handleInput(e.target.name, e.target.value)}  id="loginpw" placeholder='HEHE' name = 'password' />
                <label for="floatingPassword">Mật khẩu</label>
              </div>

              <hr/>

              <div class="d-grid mb-2">
                <button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" onClick={handleSignin} type="submit">Đăng nhập</button>
              </div>

              <hr class="my-4"/>
            
              <div class="d-grid mb-2">
                <button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" onClick={handleSignup} type="submit" style={{background: '#3DD129'}}>Tạo tài khoản mới</button>
              </div>
            
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
        </>
    )
}

