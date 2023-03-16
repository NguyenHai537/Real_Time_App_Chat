import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import axios, { HttpStatusCode } from 'axios';

export default function Login() {
    const navigate = useNavigate();
    // let {username} = useParams();
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
        //   console.log(reqUser)
          .then(res => {
            console.log(res.status)
            if(res.status === HttpStatusCode.Ok){
                let resid = res.data.id;
                navigate(`/${resid}/home`)
            }
          })
          .catch(err => {
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
                            <img className="mb-0" src="https://i.pinimg.com/originals/4b/d8/9e/4bd89e38dca8c267a4bf540efb858f05.jpg" alt="" width="120" height="120" />
                            <h1 className="h3 mb-3 fw-bold">Please sign in</h1>
                        <div className="form-floating">
                            <input onChange={(e) => handleInput(e.target.name, e.target.value)} type="text" className="form-control username" id="loginun" name = 'username'placeholder="Username" />
                            <label>Username</label>
                        </div>
                        <div className="form-floating">
                            <input onChange={(e) => handleInput(e.target.name, e.target.value)} type="password" className="form-control password" id="loginpw" name = 'password' placeholder="Password" />
                            <label>Password</label>
                        </div>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
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

// className="h1 mb-3 fw-large": Định dạng kích thước và kiểu chữ cho tiêu đề (heading) với cỡ chữ lớn, margin top và bottom là 3 và font-weight là large.
// className="container text-center": Tạo ra một khung chứa (container) với nội dung được căn giữa (center).
// className="container d-flex align-items-center text-center": Tạo ra một khung chứa (container) dùng flexbox để căn giữa các phần tử bên trong theo chiều dọc và chiều ngang, nội dung được căn giữa (center).
// className="form-signin": Định dạng kiểu dáng của khung đăng nhập.
// className="form-floating": Định dạng kiểu dáng của các ô input để có khả năng tương thích với khung đăng nhập.
// className="checkbox mb-3": Định dạng kiểu dáng của các ô checkbox và margin bottom là 3.
// className="btn btn-lg btn-primary": Định dạng kiểu dáng của nút (button) với màu nền màu xanh lam, kích thước lớn và có kiểu hiển thị chính.

