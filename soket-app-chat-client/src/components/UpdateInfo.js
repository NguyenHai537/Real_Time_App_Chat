import React from 'react'
import { useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import '../App.css';

export default function UpdateInfo() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  let {id} = useParams();
    //id is argument in URL

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the image to Cloudinary and get its URL
    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'nj55ow3p');

    axios
      .post('https://api.cloudinary.com/v1_1/dnevlrxnn/image/upload', imageData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        console.log(response.data.secure_url)

        // Insert the image URL into your Spring Boot database
        axios
          .put(`http://localhost:8080/update/${id}`, {
            username: username,
            email: email,
            password: password,
            image: imageUrl,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(navigate(`/${id}/account`));
      
  };

  return (
    <div className="container text-left">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 col-xl-9 mx-auto">
              <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                <div class="card-img-left d-none d-md-flex">
                  Background image for card set in CSS!
                </div>
                <div class="card-body p-4 p-sm-5">
                  <h5 class="card-title text-center mb-5 fw-light fs-5">Register</h5>
                  <form>

                    <div class="form-floating mb-3">
                      <input type="text" class="form-control" id="floatingInputUsername" placeholder="myusername" required autofocus/>
                      <label for="floatingInputUsername">Username</label>
                    </div>

                    <div class="form-floating mb-3">
                      <input type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com"/>
                      <label for="floatingInputEmail">Email address</label>
                    </div>

                    <hr/>

                    <div class="form-floating mb-3">
                      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                      <label for="floatingPassword">Password</label>
                    </div>

                    <div class="form-floating mb-3">
                      <input type="password" class="form-control" id="floatingPasswordConfirm" placeholder="Confirm Password"/>
                      <label for="floatingPasswordConfirm">Confirm Password</label>
                    </div>

                    <div class="d-grid mb-2">
                      <button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Register</button>
                    </div>

                    <a class="d-block text-center mt-2 small" href="#">Have an account? Sign In</a>

                    <hr class="my-4"/>

                    <div class="d-grid mb-2">
                      <button class="btn btn-lg btn-google btn-login fw-bold text-uppercase" type="submit">
                        <i class="fab fa-google me-2"></i> Sign up with Google
                      </button>
                    </div>

                    <div class="d-grid">
                      <button class="btn btn-lg btn-facebook btn-login fw-bold text-uppercase" type="submit">
                        <i class="fab fa-facebook-f me-2"></i> Sign up with Facebook
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

// resuser không được cập nhật kịp thời sau khi hàm gọi API hoàn tất. Điều này xảy ra vì useEffect 
// không thể chạy đồng bộ với render, do đó nó không thể cập nhật giá trị của resuser trước khi nó 
// được sử dụng trong giao diện.
// Để giải quyết vấn đề này, có thể sử dụng state để lưu trữ giá trị của resuser và cập nhật state 
// bằng hàm setUser khi nhận được kết quả từ API.