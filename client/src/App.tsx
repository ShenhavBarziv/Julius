//import React, { useEffect, useState } from 'react';
import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import NotFound from './NotFound/NotFound';
import Navbar from './Navbar/Navbar';
import './App.css';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Admin from './Admin/Admin';
import Change from './Change/Change';
import Delete from './Delete/Delete';
import Approve from './Approve/Approve';
import List from './List/List';
import Profile from './Profile/Profile';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />}/>
      <Route path="/admin/delete-user" element={<Delete />}/>
      <Route path="/admin/change-values" element={<Change />}/>
      <Route path="/admin/approve" element={<Approve />}/>
      <Route path="/employee-list" element={<List />}/>
      <Route path="/navbar" element={<Navbar />}/>
      <Route path ="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />{/*it's like a 404 page*/}
    </Routes>
    </BrowserRouter>

  );
}

export default App;
