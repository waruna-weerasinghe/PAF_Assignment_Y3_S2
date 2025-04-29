import React, { useState } from 'react';
import { likePost } from '../api/api';

function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      await likePost(postId);
      setLiked(!liked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`px-4 py-2 rounded-full font-semibold text-white shadow-md transition duration-300 ease-in-out
        ${liked ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 hover:bg-gray-500'}
      `}
    >
      {liked ? '❤️ Liked' : '🤍 Like'}
    </button>
  );
}

export default LikeButton;
