import React, { useEffect, useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUserAction, unFollowUserAction } from "../../Redux/User/Action";

const UserDetailCard = ({ user, isRequser, isFollowing }) => {
  const token = localStorage.getItem("token");
  const { post } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFollow, setIsFollow] = useState(false);

  const goToAccountEdit = () => navigate("/account/edit");

  const data = { jwt: token, userId: user?.id };

  const handleFollowUser = () => {
    dispatch(followUserAction(data));
    setIsFollow(true);
  };

  const handleUnFollowUser = () => {
    dispatch(unFollowUserAction(data));
    setIsFollow(false);
  };

  useEffect(() => {
    setIsFollow(isFollowing);
  }, [isFollowing]);

  return (
    <div className="py-4 px-4 bg-gray-800 shadow-md rounded-xl">
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Profile Image */}
        <img
          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-2 border-sky-400 shadow-sm"
          src={
            user?.image ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="Profile"
        />

        {/* Details */}
        <div className="flex-1 space-y-3">
          {/* Top row */}
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-semibold text-gray-100">{user?.username}</p>

            {isRequser ? (
              <button
                onClick={goToAccountEdit}
                className="bg-sky-600 text-white hover:bg-sky-700 px-3 py-1 text-sm rounded transition"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={isFollow ? handleUnFollowUser : handleFollowUser}
                className={`${
                  isFollow
                    ? "bg-gray-600 text-gray-100 hover:bg-gray-700"
                    : "bg-sky-600 text-white hover:bg-sky-700"
                } px-3 py-1 text-sm rounded transition`}
              >
                {isFollow ? "Unfollow" : "Follow"}
              </button>
            )}

            <button className="bg-gray-600 text-gray-100 hover:bg-gray-700 px-3 py-1 text-sm rounded transition">
              {isRequser ? "Add Tools" : "Message"}
            </button>

            <TbCircleDashed className="text-xl text-gray-400" />
          </div>

          {/* Stats */}
          <div className="flex space-x-6 text-sm text-gray-300">
            <div>
              <span className="font-semibold text-gray-100 mr-1">
                {post?.reqUserPost?.length || 0}
              </span>
              Posts
            </div>
            <div>
              <span className="font-semibold text-gray-100 mr-1">
                {user?.follower?.length || 0}
              </span>
              Followers
            </div>
            <div>
              <span className="font-semibold text-gray-100 mr-1">
                {user?.following?.length || 0}
              </span>
              Following
            </div>
          </div>

          {/* Name and Bio */}
          <div>
            <p className="font-semibold text-gray-100">{user?.name}</p>
            <p className="text-sm text-gray-300">{user?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailCard;
