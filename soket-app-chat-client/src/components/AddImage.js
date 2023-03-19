import React from 'react'
import { useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import '../App.css';
import '../css/UpdateInfo.css';

export default function AddImage() {

  const [image, setImage] = useState(null);

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  let {username} = useParams();
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
          .post(`http://localhost:8080/add-image/${username}`, {
              username: username,
              image : imageUrl,
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
      .finally(navigate(`/chat/${username}`));
      
  };

      return(
            
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
              <img src={image} alt="Upload Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <hr></hr>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <hr></hr>
            <button  class="btn btn-lg btn-success btn-block btn-signin" onClick={handleSubmit} >Upload Image</button>
            <button  class="btn btn-lg btn-success btn-block btn-signin" onClick={e => navigate(`/chat/${username}`)} >Enter Koneto</button>
          </form>
        </div>

      )
}

{/* <label>
Image:
<input type="file" onChange={(e) => setImage(e.target.files[0])} />
</label>                  
<button type="submit">Submit</button>
</form> */}