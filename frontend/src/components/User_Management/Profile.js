// src/Profile.js
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
    try {
      await axios.delete(`http://localhost:8081/deleteUser/${user.id}`);
      alert('User deleted.');
      navigate('/login');
    } catch (err) {
      alert('Delete failed.');
    }
  };

  return user ? (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-form">
        {Object.entries(user).map(([key, value]) => (
          <div className="form-group" key={key}>
            <label>{key}</label>
            <input
              name={key}
              value={value}
              onChange={handleChange}
              readOnly={key === 'id'}
              type={key === 'password' ? 'password' : 'text'}
            />
          </div>
        ))}
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete} className="delete-button">Delete Account</button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Profile;
