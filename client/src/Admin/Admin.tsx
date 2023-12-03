import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Admin.css'
function Admin() {
  return (
    <>
    <Navbar />
    <div className="admin-page">
      <h1>Welcome to the Admin Page</h1>
      <Link to="/admin/edit" className="admin-link">Edit User</Link>
      <Link to="/admin/approve" className="admin-link">Approve User</Link>
    </div>
    </>


  )
}

export default Admin