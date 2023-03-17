import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Chat1-1.css";
// import "./Chat1-1.css";
import { socketIOClient, io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const host = "http://localhost:3001";

export default function Chat11() {

	const socketIO = useRef();

	const navigate = useNavigate();
	const { username, room } = useParams();
	const clickedPerson = room.replace(username, "").replace("_", "")
	const [mess, setMess] = useState([]);
	const [message, setMessage] = useState("");
	const messagesEnd = useRef();

	useEffect(() => {
		socketIO.current = io.connect(host);
		const data = {
			username11: username,
			clickedPerson: clickedPerson,
			room: room
		}
		socketIO.current.emit("join-room-11", data);
		socketIO.current.on("sendDataToRoom", (dataGot) => {
			setMess((oldMsg) => [...oldMsg, dataGot]);
			scrollToBottom();
		});
		return () => {
			socketIO.current.disconnect(username);
			socketIO.current.off("join_chat");
			socketIO.current.off("sendDataServer");
		};
	}, []);

	const renderMess = mess.map((m, index) => (
		<>
			<div
				key={index}
				className={`${m.username === username ? "d-flex justify-content-end mb-4" : "d-flex justify-content-start"
					}`}
			>
				<div class="img_cont_msg">
					<img
						src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
						class="rounded-circle user_img_msg"
						alt="avatar"
					/>
				</div>
				<div class="msg_cotainer bg-success text-white">
					{m.message}
					<span class="msg_time">{m.date}</span>
				</div>
			</div>
		</>
	));

	const sendMessage = (e) => {
		if (message !== "") {
			const msg = {
				message: message,
				username: username,
				room: room,
				date:
					new Date(Date.now()).getHours() +
					":" +
					new Date(Date.now()).getMinutes(),
			};
			socketIO.current.emit("sendDataFromRoom", msg);
			setMessage("");
		}
	};

	const scrollToBottom = () => {
		messagesEnd.current.scrollIntoView({ behavior: "smooth" });
	};
	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const onEnterPress = (e) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			sendMessage();
		}
	};

	const leave = () => {
		socketIO.current.emit("leave_room", { username, room });
		navigate(`/chat/${username}`);
	};

	return (
		<div class="container-fluid h-100">
			<div class="row justify-content-center h-100">
				<div class="col-md-8 col-xl-6 chat">
					<div class="card">
						<div class="card-header msg_head">
							<div class="d-flex bd-highlight">
								<div class="img_cont">
									<img
										src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
										class="rounded-circle user_img"
									/>
									<span class="online_icon"></span>
								</div>
								<div class="user_info">
									<span>Chat with {clickedPerson}</span>
									{/* <p>1767 Messages</p> */}
								</div>
							</div>
							<span id="action_menu_btn" onClick={leave}>
								<i class="fas fa-times-circle"></i>
							</span>
						</div>
						<div class="card-body msg_card_body">
							{renderMess}
						</div>
						<div class="card-footer">
							<div class="input-group">
								<div class="input-group-append">
									<span class="input-group-text attach_btn">
										<i class="fas fa-paperclip"></i>
									</span>
								</div>
								<textarea
									name=""
									class="form-control type_msg"
									placeholder="Type your message..."
									onChange={handleChange}
									onKeyDown={onEnterPress}
									value={message}
								></textarea>
								<div class="input-group-append">
									<span class="input-group-text send_btn" onClick={sendMessage}>
										<i class="fas fa-location-arrow"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		// <div className="box-chat">
		//     <div class="box-chat_message">
		//         {renderMess}
		//         <div style={{ float: "left", clear: "both" }}
		//             ref={messagesEnd}>
		//         </div>
		//     </div>

		//     <div className="send-box">
		//         <textarea
		//             value={message}
		//             onKeyDown={onEnterPress}
		//             onChange={handleChange}
		//             placeholder="Nhập tin nhắn ..."
		//         />
		//         <button onClick={sendMessage}>
		//             Send
		//         </button>
		//     </div>

		// </div>
	);

	// return(
	//     <div class="container-fluid h-100">
	// 		<div class="row justify-content-center h-100">

	// 			<div class="col-md-8 col-xl-6 chat">
	// 				<div class="card">
	// 					<div class="card-header msg_head">
	// 						<div class="d-flex bd-highlight">
	// 							<div class="img_cont">
	// 								<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img"/>
	// 								<span class="online_icon"></span>
	// 							</div>
	// 							<div class="user_info">
	// 								<span>Chat with Khalid</span>
	// 								<p>1767 Messages</p>
	// 							</div>

	// 						</div>
	// 						<span id="action_menu_btn"><i class="fas fa-times-circle"></i></span>
	// 					</div>
	// 					<div class="card-body msg_card_body">
	// 						<div class="d-flex justify-content-start mb-4">
	// 							<div class="img_cont_msg">
	// 								<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
	// 							</div>
	// 							<div class="msg_cotainer">
	// 								Hi, how are you samim?
	// 								<span class="msg_time">8:40 AM, Today</span>
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-end mb-4">
	// 							<div class="msg_cotainer_send">
	// 								Hi Khalid i am good tnx how about you?
	// 								<span class="msg_time_send">8:55 AM, Today</span>
	// 							</div>
	// 							<div class="img_cont_msg">
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-start mb-4">
	// 							<div class="img_cont_msg">
	// 								<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
	// 							</div>
	// 							<div class="msg_cotainer">
	// 								I am good too, thank you for your chat template
	// 								<span class="msg_time">9:00 AM, Today</span>
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-end mb-4">
	// 							<div class="msg_cotainer_send">
	// 								You are welcome
	// 								<span class="msg_time_send">9:05 AM, Today</span>
	// 							</div>
	// 							<div class="img_cont_msg">
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-start mb-4">
	// 							<div class="img_cont_msg">
	// 								<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
	// 							</div>
	// 							<div class="msg_cotainer">
	// 								I am looking for your next templates
	// 								<span class="msg_time">9:07 AM, Today</span>
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-end mb-4">
	// 							<div class="msg_cotainer_send">
	// 								Ok, thank you have a good day
	// 								<span class="msg_time_send">9:10 AM, Today</span>
	// 							</div>
	// 							<div class="img_cont_msg">
	// 							</div>
	// 						</div>
	// 						<div class="d-flex justify-content-start mb-4">
	// 							<div class="img_cont_msg">
	// 								<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg"/>
	// 							</div>
	// 							<div class="msg_cotainer">
	// 								Bye, see you
	// 								<span class="msg_time">9:12 AM, Today</span>
	// 							</div>
	// 						</div>
	// 					</div>
	// 					<div class="card-footer">
	// 						<div class="input-group">
	// 							<div class="input-group-append">
	// 								<span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
	// 							</div>
	// 							<textarea name="" class="form-control type_msg" placeholder="Type your message..."></textarea>
	// 							<div class="input-group-append">
	// 								<span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// )
}