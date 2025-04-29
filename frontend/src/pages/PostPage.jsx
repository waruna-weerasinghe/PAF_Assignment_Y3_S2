import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaRegComment, FaRegPaperPlane, FaRegBookmark, FaBookmark, FaHome, FaCompass, FaPlusSquare, FaUserCircle } from 'react-icons/fa';

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [commentTexts, setCommentTexts] = useState({});
  const [comments, setComments] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [showAllComments, setShowAllComments] = useState({});
  const [showCommentInput, setShowCommentInput] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const currentUserId = 1;

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        const likes = {};
        const postComments = {};
        const bookmarks = {};
        data.forEach((post) => {
          likes[post.id] = post.likes || 0;
          postComments[post.id] = [];
          bookmarks[post.id] = false;
        });
        setLikeCounts(likes);
        setComments(postComments);
        setBookmarkedPosts(bookmarks);
      })
      .catch((err) => console.error('Error fetching posts', err));
  }, []);

  const handleLike = (postId) => {
    const key = `${currentUserId}_${postId}`;
    if (userLikes[key]) {
      setLikeCounts((prev) => ({ ...prev, [postId]: Math.max(prev[postId] - 1, 0) }));
      setUserLikes((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    } else {
      setLikeCounts((prev) => ({ ...prev, [postId]: prev[postId] + 1 }));
      setUserLikes((prev) => ({ ...prev, [key]: true }));
    }
  };

  const handleDoubleClickLike = (postId) => {
    const key = `${currentUserId}_${postId}`;
    if (!userLikes[key]) {
      handleLike(postId);
    } else {
      handleLike(postId);
    }
  };

  const handleCommentChange = (postId, text) => {
    setCommentTexts((prev) => ({ ...prev, [postId]: text }));
  };

  const handleCommentSubmit = (postId) => {
    const text = commentTexts[postId]?.trim();
    if (!text) return;
    const newComment = { id: Date.now(), userId: currentUserId, text };
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));
    setCommentTexts((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleShare = (postId) => {
    const postLink = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postLink).then(() => {
      console.log('Post link copied to clipboard!');
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toggleCommentsVisibility = (postId) => {
    setShowAllComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleCommentInput = (postId) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleBookmark = (postId) => {
    setBookmarkedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'} min-h-screen transition-colors duration-500 font-sans`}>
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b shadow-md bg-white dark:bg-black sticky top-0 z-50">
        <h1 className="text-2xl font-bold"></h1>
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex max-w-6xl mx-auto mt-8 px-4">
        {/* Left Sidebar */}
        <div className="hidden md:flex flex-col gap-6 w-[200px] pr-6">
          <div className="flex flex-col gap-6 text-lg">
            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-300 font-semibold">
              <FaHome /> Home
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-300 font-semibold">
              <FaCompass /> Explore
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-300 font-semibold">
              <FaPlusSquare /> Create
            </button>
            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors duration-300 font-semibold">
              <FaUserCircle /> Profile
            </button>
          </div>
        </div>

        {/* Center Feed */}
        <div className="flex-1 max-w-[600px] space-y-10">
          {posts.map((post) => (
            <div key={post.id} className={`rounded-2xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300 ${darkMode ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'}`}>
              
              {/* Post Header */}
              <div className="flex items-center p-4">
                <img
                  src={post.user?.profilePicture || '/default-profile.png'}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover border hover:ring-2 hover:ring-blue-400 transition"
                />
                <div className="ml-3">
                  <p className="font-semibold">{post.user?.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-400">{post.createdAt || 'Just now'}</p>
                </div>
              </div>

              {/* Post Image */}
              <div onDoubleClick={() => handleDoubleClickLike(post.id)} className="relative overflow-hidden group">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full max-h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between px-4 pt-2">
                <div className="flex items-center gap-4 text-2xl">
                  <button onClick={() => handleLike(post.id)} className="hover:scale-110 transition-transform duration-200">
                    {userLikes[`${currentUserId}_${post.id}`] ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                  </button>
                  <button onClick={() => toggleCommentInput(post.id)} className="hover:scale-110 transition-transform duration-200">
                    <FaRegComment />
                  </button>
                  <button onClick={() => handleShare(post.id)} className="hover:scale-110 transition-transform duration-200">
                    <FaRegPaperPlane />
                  </button>
                </div>
                <button onClick={() => toggleBookmark(post.id)} className="hover:scale-110 transition-transform duration-200">
                  {bookmarkedPosts[post.id] ? <FaBookmark className="text-yellow-500" /> : <FaRegBookmark />}
                </button>
              </div>

              {/* Likes Count */}
              <div className="px-4 py-2 text-sm">
                <p className="font-semibold">{likeCounts[post.id] || 0} likes</p>
              </div>

              {/* Post Description */}
              <div className="px-4 text-sm pb-2">
                {post.title && (
                  <p>
                    <span className="font-bold">{post.user?.name}</span> {post.title}
                  </p>
                )}
                {post.description && <p>{post.description}</p>}
              </div>

              {/* Comments Section */}
              <div className="px-4 pb-2 space-y-2 text-sm">
                {(showAllComments[post.id] ? comments[post.id] : comments[post.id]?.slice(0, 2))?.map((comment) => (
                  <div key={comment.id}>
                    <span className="font-semibold">User {comment.userId}</span> {comment.text}
                  </div>
                ))}
                {comments[post.id]?.length > 2 && !showAllComments[post.id] && (
                  <button
                    className="text-blue-500 font-semibold"
                    onClick={() => toggleCommentsVisibility(post.id)}
                  >
                    View all comments
                  </button>
                )}
                {showAllComments[post.id] && comments[post.id]?.length > 2 && (
                  <button
                    className="text-blue-500 font-semibold"
                    onClick={() => toggleCommentsVisibility(post.id)}
                  >
                    Hide comments
                  </button>
                )}
              </div>

              {/* Toggleable Comment Input */}
              {showCommentInput[post.id] && (
                <div className="flex items-center gap-3 px-4 pb-4 pt-2 border-t">
                  <input
                    type="text"
                    value={commentTexts[post.id] || ''}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    placeholder="Add a comment..."
                    className={`flex-1 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                  />
                  <button onClick={() => handleCommentSubmit(post.id)} className="text-blue-500 font-semibold">
                    Post
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:flex flex-col gap-6 w-[300px] pl-6">
          <div className="flex items-center gap-4">
            <img src="/default-profile.png" alt="Profile" className="w-12 h-12 rounded-full border hover:ring-2 hover:ring-blue-400 transition" />
            <div>
              <p className="font-semibold">current_user</p>
              <p className="text-sm text-gray-400">View Profile</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">Suggested for you</p>
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/default-profile.png" alt="Suggestion" className="w-8 h-8 rounded-full" />
                    <p className="text-sm">user_{n}</p>
                  </div>
                  <button className="text-blue-500 text-xs font-semibold hover:underline transition-all">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-400 mt-8">
            © 2025 Instagram Clone
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
