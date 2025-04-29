import React, { useEffect, useState } from 'react';
import { getNotifications } from '../api/api';

function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getNotifications();
      setNotifications(res.data);
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notification-dropdown">
      <h4>Notifications</h4>
      {notifications.map((note) => (
        <div key={note.id}>
          {note.message} - {new Date(note.createdAt).toLocaleTimeString()}
        </div>
      ))}
    </div>
  );
}

export default NotificationDropdown;
