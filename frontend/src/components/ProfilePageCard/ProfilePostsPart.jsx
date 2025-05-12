import React, { useEffect, useState } from "react";
import { RiVideoLine } from "react-icons/ri";
import { BiBookmark } from "react-icons/bi";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import ReqUserPostCard from "./ReqUserPostCard";
import { useDispatch, useSelector } from "react-redux";
import { reqUserPostAction } from "../../Redux/Post/Action";

const ProfilePostsPart = ({ user }) => {
  const [activeTab, setActiveTab] = useState("Post");
  const { post } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const tabs = [
    { tab: "Post", icon: <AiOutlineTable className="text-lg" /> },
    { tab: "Reels", icon: <RiVideoLine className="text-lg" /> },
    { tab: "Saved", icon: <BiBookmark className="text-lg" /> },
    { tab: "Tagged", icon: <AiOutlineUser className="text-lg" /> },
  ];

  useEffect(() => {
    if (user?.id && token) {
      dispatch(reqUserPostAction({ jwt: token, userId: user.id }));
    }
  }, [user, post.createdPost]);

  return (
    <div className="bg-gray-800 rounded-xl shadow-md p-3 mt-3">
      {/* Tab Bar */}
      <div className="flex justify-center space-x-8 border-t border-b border-gray-700 py-1">
        {tabs.map((item) => (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`flex items-center space-x-2 text-sm font-medium px-3 py-1.5 rounded-t-md transition-all duration-200
              ${activeTab === item.tab
                ? "text-sky-400 border-b-2 border-sky-400 bg-gray-700"
                : "text-gray-400 hover:text-sky-400 hover:bg-gray-700"
              }`}
          >
            <span>{item.icon}</span>
            <span>{item.tab}</span>
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
        {activeTab === "Post" && post.reqUserPost?.length > 0 ? (
          post.reqUserPost.map((item, index) => (
            <ReqUserPostCard key={index} post={item} />
          ))
        ) : activeTab === "Saved" && user?.savedPost?.length > 0 ? (
          user.savedPost.map((item, index) => (
            <ReqUserPostCard key={index} post={item} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 mt-8">
            No {activeTab.toLowerCase()} to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePostsPart;
