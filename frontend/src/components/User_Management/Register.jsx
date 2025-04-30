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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('http://localhost:8081/addUser', user);
      alert('User registered successfully!');
      setUser({
        id: '',
        name: '',
        telephone: '',
        password: '',
        email: '',
        address: '',
      });
    } catch (error) {
      console.error(error);
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-card">
        <h2 className="register-title">Create Account</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {Object.entries(user).map(([key, value]) => (
          <div key={key} className="form-group">
            <label htmlFor={key} className="form-label">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type={key === 'password' ? 'password' : 
                   key === 'email' ? 'email' : 
                   key === 'telephone' ? 'tel' : 'text'}
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? 'Processing...' : 'Register Now'}
        </button>
      </form>
    </div>
  );
}

export default Register;