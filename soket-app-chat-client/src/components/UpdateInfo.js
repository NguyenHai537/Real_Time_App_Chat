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
      <form onSubmit={handleSubmit}>
        <h1>Account Update</h1>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// resuser không được cập nhật kịp thời sau khi hàm gọi API hoàn tất. Điều này xảy ra vì useEffect 
// không thể chạy đồng bộ với render, do đó nó không thể cập nhật giá trị của resuser trước khi nó 
// được sử dụng trong giao diện.
// Để giải quyết vấn đề này, có thể sử dụng state để lưu trữ giá trị của resuser và cập nhật state 
// bằng hàm setUser khi nhận được kết quả từ API.