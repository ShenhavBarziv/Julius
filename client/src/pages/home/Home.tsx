// Home.tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import * as Constants from './constants';
function Home() {
  useEffect(() => {
    axios.get("/api", { withCredentials: true })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);
  return (
    <div className="home-container">
      <h1>{Constants.WELCOME_HEADER}</h1>
      <p>{Constants.DESCRIPTION}</p>
      <h3>{ }</h3>
      <ol className="instruction-list">
        <li>{Constants.INSTRUCTION1} <Link to="/SignUp">{Constants.SIGNUP}</Link>.</li>
        <li>{Constants.INSTRUCTION2}</li>
        <li>{Constants.INSTRUCTION3}</li>
      </ol>
      <p>
        {Constants.LOGINMSG} <Link to="/login">{Constants.LOGIN}</Link>.
      </p>
    </div>
  );
}

export default Home;
