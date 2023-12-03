import React, { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./signup.css";
import axios from 'axios';
function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
    job: '',
    birthDate: '',
    phoneNumber: '',
    position: '',
    hireDate: '',
  });

  const handleChange = (e:FormEvent<HTMLInputElement>) => {
    // Update the form values on each keystroke
    const { name, value } = e.currentTarget;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  async function handleSubmit(e:FormEvent){
    e.preventDefault();

    // Perform your signup logic here with the userData
    console.log('Sign-up data:', userData);
    // Redirect to another page or perform other actions
    //navigate('/login');
    try{
      await axios.post("http://localhost:5000/register",userData).then(res =>{
        console.log(res.data)
        if (res.data.code === 201) {
          // Successful signup
          alert("new user created successfully")
          navigate('/login', { state: userData.email });
          // Redirect or perform other actions
        } else if (res.data.code === 409) {
          // User already exists
          alert('User already exists');
        } else {
          // Handle other status codes as needed
          alert("error");
          console.log(`Signup failed with status: ${res.status}`);
        }
        console.log(res.data);
      })
  }
  catch(e){
    alert("error");
    console.log(e);
  }
  };

  return (
    <>
    <div className='SignUpForm'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* Render your form fields here */}
        <label>
          Email:
          <input type="email" name="email" onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleChange} required />
        </label>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange} required />
        </label>
        <label>
          Job:
          <input type="text" name="job" onChange={handleChange} required />
        </label>
        <label>
          Birth Date:
          <input type="text" name="birthDate" onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" onChange={handleChange} required />
        </label>
        <label>
          Position:
          <input type="text" name="position" onChange={handleChange} required />
        </label>
        <label>
          Hire Date:
          <input type="text" name="hireDate" onChange={handleChange} required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </>
  );
};

export default SignUp;