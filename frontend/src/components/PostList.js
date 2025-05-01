import React, { useEffect, useState } from 'react';
import API from '../api';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/fetchPosts').then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '1em', border: '1px solid #ccc', padding: '1em' }}>
          <p>{post.description}</p>
          <div style={{ display: 'flex', gap: '1em' }}>
            {post.mediaFiles && post.mediaFiles.map((file, i) => {
              const isVideo = file.toLowerCase().endsWith('.mp4') || file.toLowerCase().includes('.webm');
              return isVideo ? (
                <video key={i} controls width="200" src={`http://localhost:8080/uploads/${file}`} />
              ) : (
                <img key={i} alt="media" width="200" src={`http://localhost:8080/uploads/${file}`} />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
