import React from 'react';

import Chat from './components/Chat'; 
import Login from './components/Login'; 
import Chat11 from './components/Chat1-1'; 

import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserDetails from './components/UserDetails';
import UpdateInfo from './components/UpdateInfo';
import Account from './components/Account';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/" element={<Login />} />
      <Route  path="/chat/:id" element={<Chat />} />
      <Route  path="/chat1-1/:username/:value" element={<Chat11 />} />
      <Route path="/:id/updateinfo" element={<UpdateInfo/>}/>
      <Route path='/:id/account' element={<Account/>}/>
    </Routes>
    </BrowserRouter>
  );
}
// Tung them 2 router xu ly userInformation 10h 17/3
export default App;