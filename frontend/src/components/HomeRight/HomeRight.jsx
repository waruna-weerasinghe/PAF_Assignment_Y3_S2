import React from "react";
import { useSelector } from "react-redux";
import SuggestionsUserCard from "./SuggestionsUserCard";

const HomeRight = ({ suggestedUser }) => {
  const { user } = useSelector((store) => store);

  return (
    <div className="w-full max-w-sm p-5 rounded-2xl shadow-lg bg-blue-50 border border-blue-100">
      {/* Current User Info */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
            src={
              user.reqUser?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Profile"
          />
          <div>
            <p className="font-semibold text-gray-800 text-sm">
              {user.reqUser?.username}
            </p>
            <p className="text-gray-500 text-xs">@{user.reqUser?.username}</p>
          </div>
        </div>
        <button className="text-indigo-600 text-sm font-medium hover:underline transition">
          Switch
        </button>
      </div>

      {/* Suggestions Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-700">
          Suggestions for you
        </h3>
        <button className="text-xs text-indigo-500 hover:underline">
          View All
        </button>
      </div>

      {/* Suggested Users */}
      <div className="space-y-4">
        {suggestedUser.map((item, index) => (
          <SuggestionsUserCard
            key={index}
            image={
              item.userImage ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            username={item.username}
            description={"Follows you"}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeRight;
