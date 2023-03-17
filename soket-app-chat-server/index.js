var express = require("express");
const http = require("http");
var app = express();
const server = http.createServer(app);
// Long them vao bien leaveRoom vao luc 8:05
const leaveRoom = require("./utils/leave_room");
// ===========================================
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được.

const listUser = [];

// Code by Long
let chatRoomUsers = [];
let allUsers = [];
let rooms = [];
let message = "";
// ======================

socketIo.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  socket.on("sendDataClient", function (data) {
    if(listUser.indexOf(data) === -1){
      listUser.push(data);
      socket.UserName = data;
    }
    
    console.log(listUser);
    socketIo.sockets.emit("getlist", listUser);
    // Long add emit for get_room
    socketIo.sockets.emit("get_room", rooms);
    //
  });

  socket.on("logout", () => {
    listUser.splice(listUser.indexOf(socket.UserName), 1);
    socket.broadcast.emit("getlist", listUser);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });

  // Long Chat room socket
  // Chat Room =====================================================
  socket.on("join_chat", (data) => {
    const { username, room } = data;
    socket.join(room);
    allUsers.push({ id: socket.id, username, room });
    console.log(allUsers);
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
  });

  // sendDataClient dang duoc su dung o tren, Long doi ten lai de ko bi conflict!
  // Long 7:57AM da sua ten ========================
  socket.on("sendDataFromRoom", (data) => {
    const { message, username, room, date } = data;
    socketIo.in(room).emit("sendDataToRoom", data);
    // console.log(data);
  });
  // ==============================

  // Long addRoom socket
  socket.on("add_room", (data) => {
    socket.room = data;
    rooms.push(socket.room);
    socketIo.sockets.emit("get_room",rooms);
    console.log(rooms)
    
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    allUsers = leaveRoom(socket.id, allUsers);
    console.log(allUsers);
  });

  socket.on("disconnect", (data) => {
    const { username } = data;
    console.log("Client disconnect " + socket.id);
    const user = allUsers.find((user) => user.id === socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      // Long moi them vao cat mot phan tu sau khi disconnect
      listUser.splice(listUser.indexOf(socket.UserName), 1);
      socket.broadcast.emit("getlist", listUser);
      // =========================
    }
    if (allUsers.length > 0) {
      console.log(allUsers);
    } else console.log("Het roi");
  });
  // Long end========================================================
});

server.listen(3001, () => {
  console.log("Server đang chay tren cong 3001");
});
