import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add Post (Post form)
export const addPost = (formData) => {
  return API.post('/addPost', formData);
};

// Fetch all posts
export const fetchPosts = () => {
  return API.get('/fetchPosts');
};

export default API;
