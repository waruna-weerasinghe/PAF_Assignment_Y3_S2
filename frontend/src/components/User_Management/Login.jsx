import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleLogin = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(`http://localhost:8081/getUser/${credentials.id}`);
      if (res.data && res.data.password === credentials.password) {
        navigate('/profile', { state: { user: res.data } });
      } else {
        setError('Invalid ID or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2 className="login-title">Sign in to your account</h2>
        <p className="login-subtitle">
          Or{' '}
          <a href="/register" className="login-link">
            create a new account
          </a>
        </p>
      </div>

      <div className="login-card">
        {error && (
          <div className="error-message">
            <svg className="error-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="id" className="form-label">User ID</label>
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="username"
              required
              value={credentials.id}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your ID"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <div className="remember-forgot">
            <div className="remember-me">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="remember-checkbox"
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <>
                <svg className="loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"></circle>
                  <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" opacity="0.75"></path>
                </svg>
                Signing in...
              </>
            ) : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;