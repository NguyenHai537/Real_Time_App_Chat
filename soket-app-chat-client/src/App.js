import React from 'react';

import Chat from './components/Chat';
import Login from './components/Login';
import Chat11 from './components/Chat1-1';

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/" element={<Login />} />
      <Route  path="/chat/:username" element={<Chat />} />
      <Route  path="/chat1-1/:username" element={<Chat11 />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;