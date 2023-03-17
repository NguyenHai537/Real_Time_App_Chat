import React from 'react'
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import '../App.css';

export default function Account() {
    // const [user, setUser] = useState({})

    const [resuser, setResuser] = useState(
        {username: '',
         email: '',
         password: '',
         image: ''}
    )
    
    const navigate = useNavigate();
    let {username} = useParams();
    //username này là biến trên url


    const handleUpdate = (user) => {
       navigate(`/${username}/updateinfo`)
    }

    useEffect(() => {
        axios
          .get(`http://localhost:8080/${username}`)
          .then(res => {
            console.log(res.status)
            if(res.status === HttpStatusCode.Ok){
                setResuser(res.data);
                console.log(res.data)
                console.log(res.data.image)
            }
          })
          .catch(err => {
            console.log(err)
            throw err;
          });
        },[username])

    
    return (
        <div className="container text-center">
            <h1>UserAccount</h1><br/>
            <form>
                <img className="mb-0" src={resuser.image} alt="" width="120" height="120" /><br/>
                <label>Username: {resuser.username}</label><br/>

                <label>Email: {resuser.email}</label><br/>
         
                <label>Password: {resuser.password}</label><br/>
            
                <button type='button' onClick={handleUpdate}>UpdateInfo</button>
            </form>
        </div>
        
    )
}


// resuser không được cập nhật kịp thời sau khi hàm gọi API hoàn tất. Điều này xảy ra vì useEffect 
// không thể chạy đồng bộ với render, do đó nó không thể cập nhật giá trị của resuser trước khi nó 
// được sử dụng trong giao diện.
// Để giải quyết vấn đề này, có thể sử dụng state để lưu trữ giá trị của resuser và cập nhật state 
// bằng hàm setUser khi nhận được kết quả từ API.