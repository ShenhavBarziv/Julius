import React, { createContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserComponent from './UserComponent';
import { type UserContextType } from './types';
export const userContext = createContext<UserContextType | undefined>(undefined);
function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;

  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);

  return <userContext.Provider value={userData}>
      <UserComponent />
    </userContext.Provider>
}

export default User;
