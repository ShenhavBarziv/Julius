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
      <Link to="/admin/delete-user" className="admin-link">Delete User</Link>
      <Link to="/admin/change-values" className="admin-link">Edit user's Profile and grant privileges</Link>
      <Link to="/admin/approve" className="admin-link">Approve User</Link>
    </div>
    </>


  )
}

export default Admin