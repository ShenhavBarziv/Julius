import React from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css"

function Navbar() {
    async function disconnect()
    {
        alert("disconnecting\nwrite the disconnect code");
    }
  return (
    <>
    <nav>
    <Link to="/profile">Profile</Link>
    <Link to="/employee-list">Employee List</Link>
    <Link to="/admin">Admin</Link>
    <a onClick={disconnect} className='disconnect'>disconnect</a>
    </nav>
    </>
  )
}

export default Navbar