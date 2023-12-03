import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./List.css"
import type { UserData } from "./types"
import Navbar from '../Navbar/Navbar';

function List() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<UserData[]>('http://localhost:5000/list')
      .then(response => {
        setData(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);  

  return (
    <>
    <Navbar />
      {loading ? (
        <p className='loading'>Loading data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Email</th>
              <th>Position</th>
              <th>Phone Number</th>
              <th>Hire Date</th>
              <th>Birth Date</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      )}
    </>
  );
}

export default List;
