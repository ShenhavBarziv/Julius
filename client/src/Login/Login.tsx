import React, { type FormEvent, useState, useEffect } from 'react';
import "./login.css";
import axios from "axios";
import { useLocation, useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(location.state);
    if (location.state !== null) {
      setEmail(location.state);
    }
  }, []);
  async function handleSubmit(e:FormEvent)
  {
    console.log("submitedd");
    e.preventDefault();
    console.log(email,password);
    try{
      await axios.post("http://localhost:5000/login",{
          email,password
      }).then(res =>{
        if (res.status === 200) {
          console.log('Login successful');
          console.log("connected successfully");
          navigate('/user', { state: res.data });
          // Redirect or perform other actions
        } else {
          // Handle other status codes as needed
          console.log(`Login failed with status: ${res.status}`);
          setMessage("email or password are incorrect")
        }
        console.log(res.data);
      })
  }
  catch(e){
      console.log(e);
  }
  }
  return (
    <>
    <p>{message}</p>
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
          <input type="email" defaultValue={email}id="email" name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" required />
          <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" required />
          <input type="submit" value="Submit" className="submit"/>
      </form>
      <Link to="/SignUp" className="sugnup-link">Sign Up</Link>
    </div>
    </>
  )
}

export default Login