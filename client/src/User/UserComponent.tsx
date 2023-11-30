import React, { useContext } from 'react';
import { userContext } from './User';

function UserComponent() {
  const userData = useContext(userContext);

  return (
    <div>
      <p>{JSON.stringify(userData?.data)}</p>
    </div>
  );
}

export default UserComponent;
