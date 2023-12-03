// Profile.js
import React, { useEffect, useState } from 'react';
import "./Profile.css";
import axios from 'axios';
import { UserData, ProfileProps } from './types';
import Navbar from '../Navbar/Navbar';

const email = "shenhavbarziv@gmail.com";

function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [msg, SetMsg] = useState("Loading user profile...");
  useEffect(() => {
    axios.get(`/profile?email=${email}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        SetMsg("Error");
      });
  }, []);

  return (
    <>
    <Navbar />
    <div className="user-profile">
      <h1>User Profile</h1>
      {userData ? (
        <ul>
          {Object.entries(userData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      ) : (
        <p className='loading'>{msg}</p>
      )}
    </div>
    </>
  );
}

export default Profile;
