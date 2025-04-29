import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import axios from 'axios'; // install axios if not done: npm install axios

function CommentSection({ postId }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_URL = `/api/posts/${postId}/comments`;

 // Your Spring Boot backend

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/post/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (comment.trim() !== '') {
      try {
        await axios.post(API_URL, {
          postId: postId,
          userId: 1, // Adjust if you have authentication
          text: comment
        });
        setComment('');
        fetchComments();
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedComment(comments[index].text);
  };

  const handleSaveEdit = async () => {
    const commentToEdit = comments[editingIndex];
    try {
      await axios.put(`${API_URL}/${commentToEdit.id}`, {
        text: editedComment
      });
      setEditingIndex(null);
      setEditedComment('');
      fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async (index) => {
    const commentToDelete = comments[index];
    try {
      await axios.delete(`${API_URL}/${commentToDelete.id}`);
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editingIndex !== null) {
        handleSaveEdit();
      } else {
        handleAddComment();
      }
    }
  };

  return (
    <div className="mt-6">
      {/* Comment Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
      >
        <MessageSquare size={24} />
        <span className="text-sm">{comments.length} Comments</span>
      </button>

      {/* Comment Section */}
      {isOpen && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-4 text-gray-800">
            Comments ({comments.length})
          </h3>

          {loading ? (
            <div className="text-gray-400 italic">Loading comments...</div>
          ) : (
            <div className="space-y-3 mb-5">
              {comments.length === 0 ? (
                <div className="text-gray-400 italic">No comments yet. Be the first!</div>
              ) : (
                comments.map((c, index) => (
                  <div key={c.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mr-3"
                      />
                    ) : (
                      <span className="text-gray-700">{c.text}</span>
                    )}

                    <div className="flex gap-2 ml-4">
                      {editingIndex === index ? (
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-md"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded-md"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Add Comment Input */}
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write a comment and press Enter..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={editingIndex !== null}
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 rounded-r-md disabled:opacity-50"
              disabled={editingIndex !== null}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
