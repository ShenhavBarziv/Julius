// Profile.js
import React, { useEffect, useState } from 'react';
import "./Profile.css"; // Import the CSS file
import axios from 'axios';
import { UserData, ProfileProps } from './types';
import Navbar from '../Navbar/Navbar';

const email = "shenhavbarziv@gmail.com";

function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    axios.get(`/profile?email=${email}`)
      .then(response => {
        const { id, password, ...filteredData } = response.data;
        setUserData(filteredData);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
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
        <p className='loading'>Loading user profile...</p>
      )}
    </div>
    </>
  );
}

export default Profile;
