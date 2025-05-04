import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:8081/UpdateUser', user);
      alert('User updated successfully!');
    } catch (err) {
      alert('Update failed.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await axios.delete(`http://localhost:8081/deleteUser/${user.id}`);
        alert('User deleted.');
        navigate('/login');
      } catch (err) {
        alert('Delete failed.');
      }
    }
  };

  return user ? (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-form">
        <div className="profile-form-group">
          <label htmlFor="id" className="profile-label">ID</label>
          <input
            id="id"
            name="id"
            value={user.id}
            readOnly
            className="profile-input"
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="name" className="profile-label">Name</label>
          <input
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="telephone" className="profile-label">Telephone</label>
          <input
            id="telephone"
            name="telephone"
            value={user.telephone}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="password" className="profile-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="email" className="profile-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        <div className="profile-form-group">
          <label htmlFor="address" className="profile-label">Address</label>
          <input
            id="address"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        <div className="button-group">
          <button onClick={handleUpdate} className="update-button">Update</button>
          <button onClick={handleDelete} className="delete-button">Delete Account</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="loading-message">Loading...</div>
  );
};

export default Profile;