import React from "react";

import Chat from "./components/Chat";
import Login from "./components/Login";
import Chat11 from "./components/chat1-1/Chat1-1";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import Account from "./components/Account";
import UpdateInfo from "./components/UpdateInfo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat/:username" element={<Chat />} />
<<<<<<< HEAD
        <Route path="/chat1-1/:username/:room" element={<Chat11 />} />
=======
        <Route path="/:username/info" element={<Account />} />
        <Route path="/:username/updateinfo" element={<UpdateInfo />} />
        <Route path="/chat1-1/:username/:value" element={<Chat11 />} />
>>>>>>> 79b134e864d251b4c131040560998f957ad14433
        <Route path="/chatroom/:username/:room" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
