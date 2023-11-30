import React, { useContext, useEffect, useState } from 'react';
import { userContext } from './User';
import axios from 'axios';
import "./UserStyle.css"
interface UserData {
  _id: string;
  name: string;
  job: string;
  email: string;
  position: string;
  phoneNumber: string;
  hireDate: string;
  birthDate: string;
}

function UserComponent() {
  const [data, setData] = useState<UserData[]>([]);

  useEffect(() => {
    axios.get<UserData[]>('http://localhost:5000/list')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);  

  return (
    <div>
      {/* ... your existing code ... */}
      <table>
        <th>name</th>
        <th>job</th>
        <th>email</th>
        <th>position</th>
        <th>phoneNumber</th>
        <th>hireDate</th>
        <th>birthDate</th>
        {data.map(item => (
          <tr key={item._id}>
            <td>{item.name}</td>
            <td>{item.job}</td>
            <td>{item.email}</td>
            <td>{item.position}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.hireDate}</td>
            <td>{item.birthDate}</td>
          </tr>
        ))}
        <tr>

        </tr>
      </table>
      <ul>
        
      </ul>
    </div>
  );
}

export default UserComponent;
