import React from "react";

import Chat from "./components/Chat";
import Login from "./components/Login";
import Chat11 from "./components/Chat1-1";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import Account from "./components/Account";
import UpdateInfo from "./components/UpdateInfo";

const App = () => {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat/:username" element={<Chat />} />
        <Route path="/chat1-1/:username/:value" element={<Chat11 />} />
        <Route path="/chatroom/:username/:room" element={<ChatRoom />} />
      </Routes>
=======
    <Routes>
      <Route  path="/" element={<Login />} />
      <Route  path="/chat/:username" element={<Chat />} />
      <Route  path="/:username/info" element={<Account/>} />
      <Route  path="/:username/updateinfo" element={<UpdateInfo/>} />
      <Route  path="/chat1-1/:username/:value" element={<Chat11 />} />
    </Routes>
>>>>>>> e8093143c6d2c9c192f004ce583ed0947d5c519c
    </BrowserRouter>
  );
};

export default App;
