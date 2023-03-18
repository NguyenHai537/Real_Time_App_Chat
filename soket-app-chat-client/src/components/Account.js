import React from 'react'
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import '../App.css';
import '../css/Account.css';

export default function Account() {
    const [user, setUser] = useState({
        email: '',
        phone: ''
    })

    const [isEdited, setIsEdited] = useState(false);

    const [resuser, setResuser] = useState(
        {username: '',
         email: '',
         password: '',
         phone: '',
         image: ''}
    )
    
    const navigate = useNavigate();
    let {username} = useParams();
    //username này là biến trên url

    const handleChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }


    const handleUpdate = (user) => {
        setIsEdited(true);

        // setIsEdited(false);

    //    navigate(`/${username}/updateinfo`)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios 
            .post(`http://localhost:8080/update-profile/${username}`, user)
            .then(res =>
                console.log(res.data);
                if (res.status === HttpStatusCode.Ok) {
                    navigate
                }
            )


        setIsEdited(false);
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
        <div class="container">
        <div class="row login_box">
          <div class="col-md-12 col-xs-12" align="center">
            <div class="outter">
              <img src={resuser.image} class="image-circle" />
            </div>
            <h1>{resuser.username}</h1>
          </div>
    
          <div class="col-md-12 col-xs-12 login_control">
            <div class="control">
              <div class="label">Email Address</div>
              <input
                name = 'email'
                type="text"
                disabled={!isEdited}
                class="form-control"
                placeholder={resuser.email}
                onChange={handleChange}
              />
            </div>
    
            <div class="control">
              <div class="label">Phone</div>
              <input 
                name = 'phone'
                type="text" 
                disabled={!isEdited} 
                class="form-control" 
                placeholder={resuser.phone} 
                onChange={handleChange} />
            </div>
    
            <div align="center">
              <button 
                hidden={isEdited} 
                class="btn btn-orange" 
                onClick={handleUpdate} 
                placeholder={!isEdited ? "Edit Profile" : "Edit"}
                >
                Update Profile
              </button>

              <button
                class="btn btn-orange"
                onClick={(e) => navigate(`/chat/${resuser.username}`)}>
                Back to Chat
              </button>
            
              <button 
                hidden={!isEdited} 
                class="btn btn-orange" 
                onClick={handleSubmit}>
                Edit!
              </button>
            </div>
          </div>
        </div>
      </div>
       
//     <div class="container">
//     <div class="row login_box">
//       <div class="col-md-12 col-xs-12" align="center">
//         <div class="outter">
//           <img src={resuser.image} class="image-circle" />
//         </div>
//         <h1>{resuser.username}</h1>
//       </div>

//       <div class="col-md-12 col-xs-12 login_control">
//         <div class="control">
//           <div class="label">Email Address</div>
//           <input
//             type="text"
//             disabled={!isEdited}
//             class="form-control"
//             placeholder={resuser.email}
//           />
//         </div>

//         <div class="control">
//           <div class="label">Phone</div>
//           <input type="text" disabled={!isEdited} class="form-control" placeholder={resuser.phone} />
//         </div>

//         <div align="center">
//           <button class="btn btn-orange" onClick={handleUpdate}>
//           {!isEdited ? "Edit Profile" : "Edit"}
//           </button>
//           <button
//             class="btn btn-orange"
//             onClick={(e) => navigate(`/chat/${resuser.username}`)}
//           >
//             Back to Chat
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
   
    )
}

{/* <div className="container text-center">
<h1>UserAccount</h1><br/>
<form>
    <img className="mb-0" src={resuser.image} alt="" width="120" height="120" /><br/>
    <label>Username: {resuser.username}</label><br/>

    <label>Email: {resuser.email}</label><br/>

    <label>Phone: {resuser.phone}</label><br/>

    <button type='button' onClick={handleUpdate}>UpdateInfo</button>
</form>
</div> */}


// resuser không được cập nhật kịp thời sau khi hàm gọi API hoàn tất. Điều này xảy ra vì useEffect 
// không thể chạy đồng bộ với render, do đó nó không thể cập nhật giá trị của resuser trước khi nó 
// được sử dụng trong giao diện.
// Để giải quyết vấn đề này, có thể sử dụng state để lưu trữ giá trị của resuser và cập nhật state 
// bằng hàm setUser khi nhận được kết quả từ API.