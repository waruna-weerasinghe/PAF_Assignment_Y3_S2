import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/User_Management/Register';
import Login from './components/User_Management/Login';
import Profile from './components/User_Management/Profile';


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Register</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
