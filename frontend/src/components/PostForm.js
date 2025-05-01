import React, { useState } from 'react';
import API from '../api';


const PostForm = () => {
  const [description, setDescription] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("You can upload a maximum of 3 files.");
      return;
    }
    setMediaFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mediaFiles.length === 0) {
      alert("Please select at least one image or video.");
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    mediaFiles.forEach(file => formData.append('mediaFiles', file));

    try {
      await API.post('/addPost', formData);
      setDescription('');
      setMediaFiles([]);
      alert("Post uploaded!");
    } catch (err) {
      alert("Upload failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter description..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
      />
      <button type="submit">Share Post</button>
    </form>
  );
};

export default PostForm;
