import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminUserManager() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/admin/getAllUsers')
      .then(res => setAdmins(res.data.filter(user => user.role === 'admin')))
      .catch(err => alert('Failed to load admin users'));
  }, []);

  return (
    <div>
      <h2>Admin User Management</h2>
      <ul>
        {admins.map(admin => (
          <li key={admin.id}>{admin.name} - {admin.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUserManager;
