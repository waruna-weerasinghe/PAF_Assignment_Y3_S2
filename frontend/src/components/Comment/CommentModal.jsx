import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  BsBookmark,
  BsBookmarkFill,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { timeDifference } from "../../Config/Logic";
import {
  createComment,
  getAllComments,
} from "../../Redux/Comment/Action";
import { findPostByIdAction } from "../../Redux/Post/Action";
import CommentCard from "./CommentCard";

const CommentModal = ({
  isOpen,
  onClose,
  postData,
  handleLikePost,
  handleUnLikePost,
  handleSavePost,
  handleUnSavePost,
  isPostLiked,
  isSaved,
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const { post, comments, user } = useSelector((store) => store);
  const [commentContent, setCommentContent] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      dispatch(findPostByIdAction({ jwt, postId }));
      dispatch(getAllComments({ jwt, postId }));
    }
  }, [
    postId,
    comments?.createdComment,
    comments?.deletedComment,
    comments?.updatedComment,
  ]);

  const handleAddComment = () => {
    const data = {
      jwt,
      postId,
      data: {
        content: commentContent,
      },
    };
    dispatch(createComment(data));
    setCommentContent("");
  };

  const handleCommnetInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleOnEnterPress = (e) => {
    if (e.key === "Enter") handleAddComment();
  };

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  return (
    <Modal size="6xl" onClose={handleClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className="rounded-xl overflow-hidden shadow-2xl">
        <ModalBody className="p-0">
          <div className="flex h-[75vh] bg-white">
            {/* Left: Post Image */}
            <div className="w-[45%] bg-black flex items-center justify-center p-4">
              <img
                className="max-h-full max-w-full rounded-lg object-contain"
                src={post.singlePost?.image}
                alt="Post"
              />
            </div>

            {/* Right: Post Details */}
            <div className="w-[55%] p-6 relative flex flex-col">
              {/* User Info */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={
                      user.reqUser?.image ||
                      "https://www.e-learning-platform.org/images/e-learning-logo.png"
                    }
                    alt=""
                  />
                  <div>
                    <p className="font-semibold text-sm">
                      {post?.singlePost?.user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      @{post?.singlePost?.user?.username}
                    </p>
                  </div>
                </div>
                <BsThreeDots className="text-lg cursor-pointer" />
              </div>
              <hr />

              {/* Comments Section */}
              <div className="flex-1 overflow-y-auto my-4 pr-2 space-y-4">
                {comments.comments?.length > 0 ? (
                  comments.comments.map((item) => (
                    <CommentCard key={item.id} comment={item} />
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No comments yet.</p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex gap-3 text-2xl items-center">
                    {isPostLiked ? (
                      <AiFillHeart
                        onClick={handleUnLikePost}
                        className="text-red-600 cursor-pointer hover:opacity-75"
                      />
                    ) : (
                      <AiOutlineHeart
                        onClick={handleLikePost}
                        className="cursor-pointer hover:opacity-75"
                      />
                    )}
                    <FaRegComment className="cursor-pointer hover:opacity-75" />
                    <RiSendPlaneLine className="cursor-pointer hover:opacity-75" />
                  </div>
                  <div>
                    {isSaved ? (
                      <BsBookmarkFill
                        onClick={() => handleUnSavePost(post.singlePost?.id)}
                        className="text-xl cursor-pointer hover:opacity-75"
                      />
                    ) : (
                      <BsBookmark
                        onClick={() => handleSavePost(post.singlePost?.id)}
                        className="text-xl cursor-pointer hover:opacity-75"
                      />
                    )}
                  </div>
                </div>

                {/* Likes count */}
                {post.singlePost?.likedByUsers?.length > 0 && (
                  <p className="text-sm font-medium">
                    {post.singlePost?.likedByUsers?.length} likes
                  </p>
                )}
                {/* Time */}
                <p className="text-xs text-gray-500 mt-1">
                  {timeDifference(post?.singlePost?.createdAt)}
                </p>

                {/* Comment Input */}
                <div className="flex items-center mt-3 border rounded-full px-3 py-2">
                  <BsEmojiSmile className="mr-2 text-xl text-gray-500" />
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 outline-none text-sm"
                    value={commentContent}
                    onChange={handleCommnetInputChange}
                    onKeyPress={handleOnEnterPress}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;
