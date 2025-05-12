 import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeRight from "../../Components/HomeRight/HomeRight";
import PostCard from "../../Components/Post/PostCard/PostCard";
import StoryCircle from "../../Components/Story/StoryCircle/StoryCircle";
import { hasStory, suggetions, timeDifference } from "../../Config/Logic";
import { findUserPost } from "../../Redux/Post/Action";
import { findByUserIdsAction, getUserProfileAction } from "../../Redux/User/Action";

const HomePage = () => {
  const dispatch = useDispatch();
  const [userIds, setUserIds] = useState([]);
  const token = localStorage.getItem("token");
  const reqUser = useSelector((store) => store.user.reqUser);
  const { user, post } = useSelector((store) => store);
  const [suggestedUser, setSuggestedUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  useEffect(() => {
    if (reqUser) {
      const newIds = reqUser?.following?.map((user) => user.id);
      setUserIds([reqUser?.id, ...newIds]);
      setSuggestedUser(suggetions(reqUser));
    }
  }, [reqUser]);

  useEffect(() => {
    const data = {
      userIds: [userIds].join(","),
      jwt: token,
    };

    if (userIds.length > 0) {
      dispatch(findUserPost(data));
      dispatch(findByUserIdsAction(data));
    }
  }, [userIds, post.createdPost, post.deletedPost, post.updatedPost]);

  const storyUsers = hasStory(user.userByIds);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src="/images/Girl-chef-in-pink-and-cake-vector.jpg" 
                  alt="E-Learning Logo"
                  className="w-40 h-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  Welcome, {reqUser?.username}
                </h2>
              </div>

              {/* Profile Card */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="cursor-pointer mb-3"
                    onClick={() => navigate(`/${reqUser?.username}`)}
                  >
                    <img
                      src={
                        reqUser?.userImage ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt="profile"
                      className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-800">{reqUser?.fullname}</h3>
                  <p className="text-sm text-gray-500 mt-1">{reqUser?.bio || "No bio yet"}</p>
                </div>
                
                <div className="mt-5 space-y-3">
                  <div 
                    className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => navigate("/profile-views")}
                  >
                    <span className="text-sm text-gray-600">Profile viewers</span>
                    <span className="text-sm font-medium text-blue-600">20</span>
                  </div>
                  <div 
                    className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => navigate("/post-impressions")}
                  >
                    <span className="text-sm text-gray-600">Post impressions</span>
                    <span className="text-sm font-medium text-blue-600">1</span>
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Quick links</h4>
                  <ul className="space-y-2">
                    <li 
                      className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                      onClick={() => navigate("/learning_plan")}
                    >
                      <span className="mr-2">📁</span>
                      <span className="text-sm text-gray-600">Learning Plans</span>
                    </li>
                    <li 
                      className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                      onClick={() => navigate("/learning-progress")}
                    >
                      <span className="mr-2">👥</span>
                      <span className="text-sm text-gray-600">Learning Pro</span>
                    </li>
                    <li 
                      className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                      onClick={() => navigate("/newsletters")}
                    >
                      <span className="mr-2">📰</span>
                      <span className="text-sm text-gray-600">Create post</span>
                    </li>
                    <li 
                      className="flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                      onClick={() => navigate("/notifications")}
                    >
                      <span className="mr-2">📅</span>
                      <span className="text-sm text-gray-600">Notifications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="w-full lg:w-2/4">
            {/* Stories */}
            {storyUsers.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                  {storyUsers.map((item, index) => (
                    <StoryCircle
                      key={index}
                      image={
                        item?.image ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      username={item?.username}
                      userId={item?.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Posts */}
            <div className="space-y-6">
              {post.userPost?.length > 0 ? (
                post.userPost.map((item) => (
                  <PostCard
                    key={item.id}
                    userProfileImage={
                      item.user.userImage
                        ? item.user.userImage
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    username={item?.user?.username}
                    location={item?.location}
                    postImage={item?.image}
                    createdAt={timeDifference(item?.createdAt)}
                    postId={item?.id}
                    post={item}
                  />
                ))
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-700">No posts yet</h3>
                  <p className="text-gray-500 mt-2">Follow more users to see their posts here</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:w-1/4 space-y-6 sticky top-6 h-fit">
            <HomeRight suggestedUser={suggestedUser} />
            
            {/* Sponsored Content Placeholder */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-700">Sponsored</h3>
              </div>
              <div className="p-4">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>Ad content</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Discover our latest learning resources and tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;