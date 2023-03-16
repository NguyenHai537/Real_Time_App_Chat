import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Chat.css";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import CreateRoom from "./CreateRoom";

const host = "http://localhost:3001";

function Chat() {
  const [listUser, setListUser] = useState([]);
  let { username } = useParams();
  const socketRef = useRef();
  const navigate = useNavigate();
  const[isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    socketRef.current.emit("sendDataClient", username);
    socketRef.current.on("getlist", (data) => {
      setListUser(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

    function HandleClickViewProfile(){

    }

    // function HandleClickCreateRoom(){
    
    // }

  function HandleClickLogout() {
    socketRef.current.emit("logout");
    navigate(`/`);
  }

  function HandleClickChat11(){
    navigate(`/Chat1-1/${username}`)
  }

  const renderMess = listUser.map((user) => (
    <li class="active">
      <div class="d-flex bd-highlight" onClick={HandleClickChat11}>
	  
        <div class="img_cont">
          <img
            src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
            class="rounded-circle user_img"
            />
          <span class="online_icon"> </span>
        </div>
        <div class="user_info">
          <span>{user} </span>
          <p>online</p>
		  
        </div>		
      </div>
    </li>
  ));

  return (
    <div class="container-fluid h-100">
      <div class="row justify-content-center h-100">
        <div class="col-md-4 col-xl-3 chat">
          <div class="card mb-sm-3 mb-md-0 contacts_card">
            <h2 style={{ textAlign: "center", color: "wheat" }}>
              Danh Sach Online
            </h2>
            <div class="card-header">
              <div class="input-group">
                <input
                  type="text"
                  placeholder="Search..."
                  name=""
                  class="form-control search"
                />
                <div class="input-group-prepend">
                  <span class="input-group-text search_btn">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="card-body contacts_body">
              <ui class="contacts">{renderMess}</ui>
            </div>
            <div class="card-footer"></div>
          </div>
        </div>
        <div class="col-md-4 col-xl-3 chat">
          <div class="card mb-sm-3 mb-md-0 contacts_card">
            <h2 style={{ textAlign: "center", color: "wheat" }}>
              Danh Sach Phong
            </h2>
            <div class="card-header">
              <div class="input-group">
                <input
                  type="text"
                  placeholder="Search..."
                  name=""
                  class="form-control search"
                />
                <div class="input-group-prepend">
                  <span class="input-group-text search_btn">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="card-body contacts_body">
              <ui class="contacts">{renderMess}</ui>
            </div>
            <div class="card-footer"></div>
          </div>
        </div>
        <div class="col-md-4 col-xl-3 chat">
          <div class="card mb-sm-3 mb-md-0 contacts_card">
            <div style={{ textAlign: "center" }}>
              <img
                src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                class="rounded-circle user_img mt-5"
				style={{width:150, height:150}}
              />
            </div>
			<div style={{textAlign: "center"}} className="mt-4">
				<button style={{width: 280, textAlign: "left"}} className="btn btn-info" type="button"  data-toggle="modal" data-target="#exampleModal"><i className="fas fa-plus"></i> Create room</button>
				<button onClick={HandleClickViewProfile} style={{width: 280, textAlign: "left"}} className="btn btn-info mt-3"><i className="fas fa-user-edit"></i> Edit Profile</button>
				<button onClick={HandleClickLogout} style={{width: 280, textAlign: "left"}} className="btn btn-info mt-3"><i className="fas fa-sign-out-alt"></i> Logout</button>
			</div>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
      
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
