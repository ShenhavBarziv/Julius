import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import type { UserData } from './types';
import axios from 'axios';

function EditUser() {
    const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [msg, setMsg] = useState('Loading user profile...');

  useEffect(() => {
    axios.get(`/EditUser?id=${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        setMsg('Error');
      });
  }, [userId]);

  const handleInputChange = (key: string, value: string | boolean) => {
    setUserData((prevUserData: UserData | null) => ({
      ...prevUserData!,
      [key]: value,
    }));
  };

  function handleSave () {
    console.log(userData);
    axios.post("/SaveUserChanges",{userId, userData})
      .then((response) => {
        if(response.data.code == 200)
        {
            console.log(response.data.msg);
            navigate("/admin/edit");
        }
        else{
            alert(response.data.msg)
        }
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
        alert("error");
      });
  };

  return (
    <>
      <Navbar />
      <div className="user-profile">
        <h1>Edit User</h1>
        {userData ? (
          <form>
            {Object.entries(userData).map(([key, value]) => (
              <div key={key} className="form-group">
                <label>{key}:</label>
                {key === 'admin' ? (
                  <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => handleInputChange(key, e.target.checked)}
                  />
                ) : (
                  <input
                    type="text"
                    value={value as string} // assuming value is a string
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                )}
              </div>
            ))}
            <button type="button" onClick={handleSave}>
              Save
            </button>
          </form>
        ) : (
          <p className="loading">{msg}</p>
        )}
      </div>
    </>
  );
}

export default EditUser;
