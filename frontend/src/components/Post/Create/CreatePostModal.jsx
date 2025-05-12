 import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { GrEmoji } from "react-icons/gr";
import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";
import SpinnerCard from "../../Spinner/Spinner";

const CreatePostModal = ({ isOpen, onClose }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  const [postData, setPostData] = useState({
    mediaUrls: [],
    caption: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
    setIsDragOver(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleOnChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = async (files) => {
    const validFiles = files.filter((file) =>
      file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    if (validFiles.length === 0) {
      alert("Please select image or video files.");
      return;
    }

    setUploadStatus("uploading");
    try {
      const uploadPromises = validFiles.map((file) =>
        uploadToCloudinary(file)
      );
      const urls = await Promise.all(uploadPromises);

      setPostData((prev) => ({
        ...prev,
        mediaUrls: [...prev.mediaUrls, ...urls.filter((url) => url)],
      }));
      setUploadStatus("uploaded");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");
      alert("Failed to upload files. Please try again.");
    }
  };

  const handleSubmit = () => {
    if (!token || postData.mediaUrls.length === 0) return;

    const data = {
      jwt: token,
      data: postData,
    };

    dispatch(createPost(data));
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setPostData({ mediaUrls: [], caption: "", location: "" });
    setUploadStatus("");
    setIsDragOver(false);
    setCurrentMediaIndex(0);
  };

  const isVideo = (url) => url.match(/\.(mp4|webm|ogg)$/i);

  return (
    <Modal size="5xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay className="backdrop-blur-sm bg-black/40" />
      <ModalContent className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50">
        <div className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-gray-900 to-gray-800">
          <p className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            Create New Post
          </p>
          <Button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-indigo-700"
            isDisabled={postData.mediaUrls.length === 0}
            _hover={{ transform: "translateY(-1px)" }}
            _active={{ transform: "translateY(0)" }}
          >
            Share
          </Button>
        </div>

        <ModalBody className="p-0">
          <div className="flex h-[70vh]">
            {/* Left: Upload / Preview Area */}
            <div className="w-1/2 flex justify-center items-center relative bg-gradient-to-br from-gray-100 to-gray-200">
              {uploadStatus === "" && (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`w-full h-full border-2 border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${
                    isDragOver 
                      ? "border-blue-400/90 bg-blue-50/70 shadow-inner" 
                      : "border-gray-300/70 bg-white/50 hover:bg-white/70"
                  }`}
                >
                  <div className="p-5 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 shadow-md mb-4">
                    <FaPhotoVideo className="text-4xl text-blue-600" />
                  </div>
                  <p className="text-gray-700 font-medium mb-1">Drag photos or videos here</p>
                  <p className="text-gray-500 text-sm mb-6">High resolution recommended</p>
                  <label
                    htmlFor="file-upload"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-600"
                  >
                    Select from computer
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*, video/*"
                    multiple
                    onChange={handleOnChange}
                    className="hidden"
                  />
                  <p className="text-gray-400 text-xs mt-4">Supports JPG, PNG, MP4</p>
                </div>
              )}

              {uploadStatus === "uploading" && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
                  <SpinnerCard />
                  <p className="absolute bottom-10 text-gray-600 font-medium">Uploading your media...</p>
                </div>
              )}

              {uploadStatus === "uploaded" && (
                <div className="w-full h-full relative bg-gray-900 rounded-xl overflow-hidden">
                  {postData.mediaUrls.map((url, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 flex items-center justify-center bg-black ${
                        index === currentMediaIndex ? "block" : "hidden"
                      }`}
                    >
                      {isVideo(url) ? (
                        <video
                          src={url}
                          controls
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <img
                          src={url}
                          alt={`media-${index}`}
                          className="max-h-full max-w-full object-contain"
                        />
                      )}
                    </div>
                  ))}

                  {postData.mediaUrls.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {postData.mediaUrls.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentMediaIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentMediaIndex
                              ? "bg-blue-500 w-6"
                              : "bg-gray-500/50 hover:bg-gray-400"
                          }`}
                          aria-label={`Media ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

            {/* Right: Post Details */}
            <div className="w-1/2 p-6 flex flex-col bg-white">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <img
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                    src={
                      user?.reqUser?.image ||
                      "https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"
                    }
                    alt="user"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <p className="ml-3 font-semibold text-gray-800">
                  {user?.reqUser?.username}
                </p>
              </div>

              <div className="relative flex-1">
                <textarea
                  name="caption"
                  placeholder="Write a captivating caption..."
                  rows="6"
                  value={postData.caption}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:border-transparent resize-none bg-gray-50/50 shadow-inner"
                  style={{ minHeight: "180px" }}
                />
                <div className="absolute bottom-3 right-3 flex items-center">
                  <GrEmoji className="text-gray-500 hover:text-gray-700 cursor-pointer mr-2" />
                  <span className="text-xs text-gray-500 font-medium">
                    {postData.caption.length}/2,200
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    placeholder="Add location (optional)"
                    value={postData.location}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:border-transparent bg-gray-50/50 shadow-inner"
                  />
                  <GoLocation className="absolute left-3 top-3.5 text-xl text-blue-500" />
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-gray-500">
                  <div className="flex space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <button className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
                    Advanced settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;