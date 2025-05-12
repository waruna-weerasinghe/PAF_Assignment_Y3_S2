import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart
} from "react-icons/ai";
import {
  BsBookmark,
  BsBookmarkFill,
  BsDot,
  BsEmojiSmile,
  BsThreeDots
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  isPostLikedByUser,
  isReqUserPost,
  isSavedPost,
  timeDifference
} from "../../../Config/Logic";
import { createComment } from "../../../Redux/Comment/Action";
import {
  deletePostAction,
  likePostAction,
  savePostAction,
  unLikePostAction,
  unSavePostAction
} from "../../../Redux/Post/Action";
import { createNotificationAction } from "../../../Redux/Notification/Action";
import CommentModal from "../../Comment/CommentModal";
import EditPostModal from "../Create/EditPostModal";
import "./PostCard.css";

const PostCard = ({
  userProfileImage,
  username,
  location,
  post,
  createdAt,
}) => {
  const [commentContent, setCommentContent] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const [isSaved, setIsSaved] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openEditPostModal, setOpenEditPostModal] = useState(false);
  const [numberOfLikes, setNumberOfLike] = useState(0);

  const data = { jwt: token, postId: post.id };

  const handleCommentInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleAddComment = () => {
    dispatch(createComment({
      jwt: token,
      postId: post.id,
      data: { content: commentContent },
    }));
    setCommentContent("");

    if (post.user.id !== user.reqUser.id) {
      dispatch(createNotificationAction({
        message: `${user.reqUser.username} commented: ${commentContent}`,
        type: "COMMENT",
        postId: post.id
      }, token));
    }
  };

  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") handleAddComment();
  };

  const handleLikePost = () => {
    dispatch(likePostAction(data));
    setIsPostLiked(true);
    setNumberOfLike(numberOfLikes + 1);

    if (post.user.id !== user.reqUser.id) {
      dispatch(createNotificationAction({
        message: `${user.reqUser.username} liked your post`,
        type: "LIKE",
        postId: post.id
      }, token));
    }
  };

  const handleUnLikePost = () => {
    dispatch(unLikePostAction(data));
    setIsPostLiked(false);
    setNumberOfLike(numberOfLikes - 1);
  };

  const handleSavePost = () => {
    dispatch(savePostAction(data));
    setIsSaved(true);
  };

  const handleUnSavePost = () => {
    dispatch(unSavePostAction(data));
    setIsSaved(false);
  };

  const handleNavigate = (username) => {
    navigate(`/${username}`);
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex(prev =>
      prev === post.mediaUrls.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex(prev =>
      prev === 0 ? post.mediaUrls.length - 1 : prev - 1
    );
  };

  const isVideo = (url) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  useEffect(() => {
    setIsSaved(isSavedPost(user.reqUser, post.id));
    setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id));
    setNumberOfLike(post?.likedByUsers?.length);
  }, [user.reqUser, post]);

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleWindowClick = (event) => {
    if (!event.target.matches(".dots")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleDeletePost = (postId) => {
    dispatch(deletePostAction({ jwt: token, postId }));
  };

  const isOwnPost = isReqUserPost(post, user.reqUser);

  const handleOpenCommentModal = () => {
    navigate(`/p/${post.id}`);
    onOpen();
  };

  const handleCloseEditPostModal = () => {
    setOpenEditPostModal(false);
  };

  const handleOpenEditPostModal = () => {
    setOpenEditPostModal(true);
  };

  return (
    <div className="w-full flex flex-col items-center border rounded-md mb-8 bg-blue-50">
      {/* Header */}
      <div className="flex justify-between items-center w-full py-4 px-5">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full"
            src={post.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt=""
          />
          <div className="pl-2">
            <p className="font-semibold text-sm flex items-center">
              <span onClick={() => handleNavigate(username)} className="cursor-pointer">
                {post?.user?.username}
              </span>
              <span className="opacity-50 flex items-center">
                <BsDot />
                {timeDifference(post?.createdAt)}
              </span>
            </p>
            <p className="font-thin text-sm">{location}</p>
          </div>
        </div>
        {isOwnPost && (
          <div className="relative">
            <BsThreeDots onClick={handleClick} className="dots cursor-pointer" />
            {showDropdown && (
              <div className="absolute right-0 top-6 bg-white border shadow-xl z-10 w-32">
                <p onClick={handleOpenEditPostModal} className="hover:bg-gray-200 px-4 py-2 cursor-pointer">Edit</p>
                <hr />
                <p onClick={() => handleDeletePost(post.id)} className="hover:bg-gray-200 px-4 py-2 cursor-pointer">Delete</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Media Slider */}
      <div className="relative overflow-hidden w-full h-[400px]">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentMediaIndex * 100}%)` }}
        >
          {post.mediaUrls?.map((url, index) => (
            <div key={index} className="w-full flex-shrink-0 h-[400px]">
              {isVideo(url) ? (
                <video src={url} controls className="w-full h-full object-cover" />
              ) : (
                <img src={url} alt={`media-${index}`} className="w-full h-full object-cover" />
              )}
            </div>
          ))}
        </div>

        {post.mediaUrls?.length > 1 && (
          <>
            <ChevronLeftIcon
              onClick={handlePrevMedia}
              className="absolute top-1/2 left-2 text-white text-3xl cursor-pointer bg-black bg-opacity-30 rounded-full p-1"
            />
            <ChevronRightIcon
              onClick={handleNextMedia}
              className="absolute top-1/2 right-2 text-white text-3xl cursor-pointer bg-black bg-opacity-30 rounded-full p-1"
            />
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center w-full px-5 py-4">
        <div className="flex items-center space-x-2">
          {isPostLiked ? (
            <AiFillHeart onClick={handleUnLikePost} className="text-2xl text-red-600 cursor-pointer" />
          ) : (
            <AiOutlineHeart onClick={handleLikePost} className="text-2xl cursor-pointer" />
          )}
          <FaRegComment onClick={handleOpenCommentModal} className="text-xl cursor-pointer" />
          <RiSendPlaneLine className="text-xl cursor-pointer" />
        </div>
        <div>
          {isSaved ? (
            <BsBookmarkFill onClick={handleUnSavePost} className="text-xl cursor-pointer" />
          ) : (
            <BsBookmark onClick={handleSavePost} className="text-xl cursor-pointer" />
          )}
        </div>
      </div>

      {/* Post Info */}
      <div className="w-full py-2 px-5">
        {numberOfLikes > 0 && <p className="text-sm">{numberOfLikes} likes</p>}
        <p className="py-2">
          <span className="font-semibold">{post?.user?.username}</span> {post.caption}
        </p>
        {post?.comments?.length > 0 && (
          <p onClick={handleOpenCommentModal} className="text-sm text-gray-500 cursor-pointer">
            View all {post.comments.length} comments
          </p>
        )}
      </div>

      {/* Comment Input */}
      <div className="border-t w-full">
        <div className="flex items-center px-5 py-2 space-x-2">
          <BsEmojiSmile />
          <input
            onKeyPress={handleOnEnterPress}
            onChange={handleCommentInputChange}
            value={commentContent}
            className="flex-1 outline-none"
            type="text"
            placeholder="Add a comment..."
          />
        </div>
      </div>

      {/* Modals */}
      <EditPostModal
        onClose={handleCloseEditPostModal}
        isOpen={openEditPostModal}
        post={post}
      />

      <CommentModal
        handleLikePost={handleLikePost}
        handleSavePost={handleSavePost}
        handleUnSavePost={handleUnSavePost}
        handleUnLikePost={handleUnLikePost}
        isPostLiked={isPostLiked}
        isSaved={isSaved}
        postData={post}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default PostCard;
