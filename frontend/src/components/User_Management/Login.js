// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8081/getUser/${credentials.id}`);
      if (res.data && res.data.password === credentials.password) {
        alert('Login successful!');
        navigate('/profile', { state: { user: res.data } });
      } else {
        alert('Invalid ID or password.');
      }
    } catch (err) {
      alert('Login failed.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input name="id" placeholder="ID" value={credentials.id} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
