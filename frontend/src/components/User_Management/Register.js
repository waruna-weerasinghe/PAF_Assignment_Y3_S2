// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [user, setUser] = useState({
    id: '',
    name: '',
    telephone: '',
    password: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/addUser', user);
      alert('User registered successfully!');
      setUser({ id: '', name: '', telephone: '', password: '', email: '', address: '' });
    } catch (error) {
      console.error(error);
      alert('Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>User Registration</h2>
        {Object.entries(user).map(([key, value]) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === 'password' ? 'password' : 'text'}
              name={key}
              id={key}
              value={value}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
