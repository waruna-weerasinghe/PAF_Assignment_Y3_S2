import React from "react";

const SuggestionsUserCard = ({ image, username, description }) => {
  return (
    <div className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg transition">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt="suggested-user"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-medium">{username}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <button className="text-blue-600 text-sm font-semibold hover:underline">
        Follow
      </button>
    </div>
  );
};

export default SuggestionsUserCard;
