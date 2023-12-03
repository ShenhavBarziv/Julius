import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Approve.css'; // Import your new CSS file
import axios from 'axios';
import type { UserData } from './types';

function Approve() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  async function fetch()
  {
    axios.get<UserData[]>('http://localhost:5000/approve')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }
  useEffect(() => {fetch()}, []);

  async function handleApprove(id: string) {
    try {
      console.log(`Approving user with id: ${id}`);
      const response = await axios.post('http://localhost:5000/reg', { id });
      console.log(response.data);
    } catch (error) {
      console.error(`Error approving user: ${error}`);
    }
    finally
    {
        fetch();
    }
  }
  
  async function handleDelete(id: string) {
    try {
      console.log(`Deleting user with id: ${id}`);
      const response = await axios.delete('http://localhost:5000/reg', { data: { id } });
      console.log(response.data);
    } catch (error) {
      console.error(`Error deleting user: ${error}`);
    }
    finally{
        fetch();
    }
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <p className='loading'>Loading data...</p>
      ) : (
        <table className='user-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Email</th>
              <th>Position</th>
              <th>Phone Number</th>
              <th>Hire Date</th>
              <th>Birth Date</th>
              <th>Actions</th>
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
                <td>
                  <button
                    className='approve'
                    onClick={() => handleApprove(item._id)}
                  >
                    Approve
                  </button>
                  <button
                    className='delete'
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Approve;
