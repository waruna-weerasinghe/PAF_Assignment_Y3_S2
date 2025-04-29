import axios from 'axios';

// Connect to backend
const API = axios.create({ baseURL: 'http://localhost:8080/api' });

// Functions for like, comment, notification
export const likePost = (postId) => API.post(`/likes/${postId}`);
export const addComment = (postId, comment) => API.post(`/comments/${postId}`, { content: comment });
export const editComment = (commentId, comment) => API.put(`/comments/${commentId}`, { content: comment });
export const deleteComment = (commentId) => API.delete(`/comments/${commentId}`);
export const getNotifications = () => API.get(`/notifications`);

export default API;
