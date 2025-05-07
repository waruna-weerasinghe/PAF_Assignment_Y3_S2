import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input name="id" placeholder="ID" value={credentials.id} onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
