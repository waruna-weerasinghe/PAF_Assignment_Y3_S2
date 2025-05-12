 import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import StoryViewer from "../../Components/Story/StoryViewer/StoryViewer";
import { findStoryByUserId } from "../../Redux/Story/Action";
import { FiArrowLeft } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const Story = () => {
  const { story } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("token");
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const data = { jwt, userId };
    setLoading(true);
    dispatch(findStoryByUserId(data))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [userId, dispatch, jwt]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stories...</p>
        </div>
      </div>
    );
  }

  if (!story.stories || story.stories.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <AiOutlineClose className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Stories Available</h3>
          <p className="text-gray-500 mb-6">
            This user hasn't posted any stories yet. Check back later!
          </p>
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Story Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <button
          onClick={handleGoBack}
          className="text-white p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <FiArrowLeft className="text-xl" />
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <img
              src={story.stories[0]?.user?.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt="profile"
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
            <span className="ml-2 text-white font-medium">
              {story.stories[0]?.user?.username}
            </span>
          </div>
          
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>

      {/* Story Options Menu */}
      {showOptions && (
        <div className="absolute top-16 right-4 z-20 bg-white rounded-lg shadow-lg w-48 overflow-hidden">
          <button className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-800">
            Report Story
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-800">
            Mute User
          </button>
          <button className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-800">
            Share Profile
          </button>
        </div>
      )}

      {/* Story Viewer */}
      <div className="h-full w-full">
        <StoryViewer stories={story.stories} />
      </div>

      {/* Reply Input (Optional) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Send message"
            className="flex-1 bg-white/20 text-white placeholder-white/50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Story;