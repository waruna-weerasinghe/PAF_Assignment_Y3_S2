import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/User_Management/Register';
import Login from './components/User_Management/Login';
import Profile from './components/User_Management/Profile';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Register</Link> | <Link to="/login">Login</Link> | <Link to="/post">Post</Link> | <Link to="/profile">Profile</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post" element={<PostForm />} />
        <Route path="/posts" element={<PostList />} />
      </Routes>
    </Router>
  );
}

export default App;
