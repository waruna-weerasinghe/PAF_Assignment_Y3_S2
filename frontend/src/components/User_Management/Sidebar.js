import React from 'react';
import './AdminPanel.css';

function Sidebar({ setActive, active }) {
  return (
    <div className="sidebar">
      <h3>Admin Dashboard</h3>
      <button onClick={() => setActive('posts')} className={active === 'posts' ? 'active' : ''}>Post Management</button>
      <button onClick={() => setActive('plans')} className={active === 'plans' ? 'active' : ''}>Plan Management</button>
      <button onClick={() => setActive('users')} className={active === 'users' ? 'active' : ''}>User Management</button>
      <button onClick={() => setActive('admins')} className={active === 'admins' ? 'active' : ''}>Admin User Management</button>
    </div>
  );
}

export default Sidebar;
