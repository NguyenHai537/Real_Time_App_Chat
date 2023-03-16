import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import SignUp from './components/SignUp';
import GetUser from './components/GetUser';
import FileUploader from './draft/FileUploader';
import Home from './components/Home';
import Account from './components/Account';
import UpdateInfo from './components/UpdateInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/:id/home' element={<Home/>}/>
        <Route path='/:id/account' element={<Account/>}/>
        <Route path='/:id/updateinfo' element={<UpdateInfo/>}/>
      </Routes>
    </BrowserRouter> */
    {/* <GetUser/>
    {/* <FileUploader/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
