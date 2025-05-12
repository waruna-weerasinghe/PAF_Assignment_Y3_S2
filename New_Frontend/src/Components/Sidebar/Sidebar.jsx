 import { useDisclosure } from "@chakra-ui/hooks";
import React, { useRef, useState } from "react";
import { IoReorderThreeOutline, IoLogOutOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router";
import { mainu } from "./SidebarConfig";
import SearchComponent from "../SearchComponent/SearchComponent";
import { useSelector } from "react-redux";
import CreatePostModal from "../Post/Create/CreatePostModal";
import CreateReelModal from "../Create/CreateReel";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((store) => store);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCreateReelModalOpen, setIsCreateReelModalOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "Profile":
        navigate(`/${user.reqUser?.username}`);
        break;
      case "Home":
        navigate("/");
        break;
      case "Create Post":
        onOpen();
        break;
      case "Reels":
        navigate("/reels");
        break;
      case "Create Reels":
        handleOpenCreateReelModal();
        break;
      case "Notifications":
        navigate("/notifications");
        break;
      case "Create Story":
        navigate("/create-story");
        break;
      case "Learning Plan":
        navigate("/learning_plan");
        break;
      case "Learning Progress":
        navigate("/learning-progress");
        break;
      case "Search":
        setIsSearchBoxVisible(true);
        return;
      default:
        break;
    }
    setIsSearchBoxVisible(false);
  };

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleCloseCreateReelModal = () => {
    setIsCreateReelModalOpen(false);
  };

  const handleOpenCreateReelModal = () => {
    setIsCreateReelModalOpen(true);
  };

  const tabVariants = {
    hover: {
      scale: 1.03,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <div className="sticky top-0 h-screen w-80 pb-10 flex flex-col bg-gradient-to-b from-[#0A0F2C]/95 via-[#1A1F4C]/95 to-[#0A0F2C]/95 backdrop-blur-3xl shadow-[0_0_50px_rgba(109,40,217,0.3)] text-white font-medium z-40 border-r border-white/10">
      <div className={`flex flex-col justify-between h-full w-full px-6`}>
        {/* Logo Section */}
        <div className="pt-8">
          {!isSearchBoxVisible && (
            <div className="flex justify-center mb-10">
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  className="relative w-48 h-48 object-cover rounded-full border-4 border-white/30 group-hover:border-white/50 transition-all duration-500"
                  src="/images/Brown Beige Cute Bakery Logo.png" 
                  alt="Logo"
                />
              </motion.div>
            </div>
          )}

          {/* Menu Items */}
          <div className="space-y-2">
            {mainu.map((item) => (
              <motion.div
                key={item.title}
                onClick={() => handleTabClick(item.title)}
                onHoverStart={() => setHoveredTab(item.title)}
                onHoverEnd={() => setHoveredTab(null)}
                variants={tabVariants}
                whileHover="hover"
                whileTap="tap"
                className={`flex items-center gap-4 cursor-pointer rounded-xl px-4 py-3 transition-all duration-300 relative overflow-hidden
                  ${
                    activeTab === item.title
                      ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-lg shadow-purple-500/30 ring-1 ring-white/20"
                      : "hover:bg-white/10 hover:shadow-md hover:shadow-white/5"
                  }`}
              >
                {hoveredTab === item.title && !(activeTab === item.title) && (
                  <motion.div 
                    className="absolute inset-0 bg-white/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <div className={`text-2xl relative z-10 ${
                  activeTab === item.title 
                    ? "text-white drop-shadow-lg" 
                    : "text-white/80 group-hover:text-white"
                }`}>
                  {activeTab === item.title ? item.activeIcon : item.icon}
                </div>
                {!isSearchBoxVisible && (
                  <p className={`text-base relative z-10 ${
                    activeTab === item.title 
                      ? "text-white font-semibold" 
                      : "text-white/90 group-hover:text-white"
                  }`}>{item.title}</p>
                )}
                {activeTab === item.title && (
                  <motion.div 
                    className="absolute right-4 h-2 w-2 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div className="relative mb-8">
          <motion.div
            onClick={handleClick}
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center cursor-pointer px-4 py-3 rounded-xl transition-all duration-300 group"
          >
            <IoReorderThreeOutline className="text-2xl text-white/80 group-hover:text-white" />
            {!isSearchBoxVisible && <p className="ml-4 text-white/90 group-hover:text-white">More Options</p>}
          </motion.div>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 20 }}
                className="absolute bottom-16 left-0 w-56 bg-white/95 backdrop-blur-sm text-gray-900 shadow-2xl rounded-xl overflow-hidden ring-1 ring-white/30 z-50"
              >
                <div className="py-1">
                  <motion.div 
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                    className="flex items-center px-4 py-3 cursor-pointer transition-colors"
                  >
                    <FiSettings className="mr-3 text-gray-600" />
                    <span className="text-sm font-medium">Settings</span>
                  </motion.div>
                  <div className="border-t border-gray-100/50 my-1"></div>
                  <motion.div 
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                    onClick={handleLogout}
                    className="flex items-center px-4 py-3 cursor-pointer transition-colors"
                  >
                    <IoLogOutOutline className="mr-3 text-gray-600" />
                    <span className="text-sm font-medium">Log out</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Search Panel */}
      {isSearchBoxVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full bg-gradient-to-b from-[#1A1F4C] to-[#0F153C] p-6 border-t border-white/10"
        >
          <SearchComponent setIsSearchVisible={setIsSearchBoxVisible} />
        </motion.div>
      )}

      {/* Modals */}
      <CreatePostModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
      <CreateReelModal
        onClose={handleCloseCreateReelModal}
        isOpen={isCreateReelModalOpen}
        onOpen={handleOpenCreateReelModal}
      />
    </div>
  );
};

export default Sidebar;