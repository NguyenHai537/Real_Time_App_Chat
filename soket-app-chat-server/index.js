var express = require("express");
const http = require("http");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được.

const listUser = [];

socketIo.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  socket.on("sendDataClient", function (data) {
    listUser.push(data);
    socket.UserName = data;
    console.log(listUser);
    socketIo.sockets.emit("getlist", listUser);
  });

  socket.on("logout", () => {
    listUser.splice(listUser.indexOf(socket.UserName), 1);
    socket.broadcast.emit("getlist", listUser);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server đang chay tren cong 3001");
});
