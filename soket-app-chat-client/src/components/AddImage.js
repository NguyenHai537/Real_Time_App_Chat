import React from 'react'
import { useState} from 'react';
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
            <form onSubmit={handleSubmit}>
                  <label>
                        Image:
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                  </label>                  
                  <button type="submit">Submit</button>
            </form>

      )
}