//import React, { useEffect, useState } from 'react';
import Home from './Home/Home'
import Login from './Login/Login';
import SignUp from './SignUp/SignUp'
import NotFound from './NotFound/NotFound'
import User from './User/User'
import './App.css';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/user" element={<User />} />
      <Route path ="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />{/*it's like a 404 page*/}
    </Routes>
    </BrowserRouter>

  );
}

export default App;
