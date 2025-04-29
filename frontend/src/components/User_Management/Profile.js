import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

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
    <div>
      <h2>User Profile</h2>
      <input name="id" value={user.id} readOnly /><br />
      <input name="name" value={user.name} onChange={handleChange} /><br />
      <input name="telephone" value={user.telephone} onChange={handleChange} /><br />
      <input name="password" value={user.password} onChange={handleChange} type="password" /><br />
      <input name="email" value={user.email} onChange={handleChange} /><br />
      <input name="address" value={user.address} onChange={handleChange} /><br />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete Account</button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Profile;
