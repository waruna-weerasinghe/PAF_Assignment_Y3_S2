// SidebarConfig.js
import React from "react";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiFillCompass,
  AiFillMessage,
  AiOutlineMessage,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlinePlusCircle,
  AiFillPlusCircle,
  AiOutlineCamera,
  AiFillCamera,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

export const mainu = [
  {
    title: "Home",
    icon: <AiOutlineHome className="text-2xl mr-2" />,
    activeIcon: <AiFillHome className="text-2xl mr-2" />,
  },
  // {
  //   title: "About Us",
  //   icon: <AiOutlineInfoCircle className="text-2xl mr-2" />,
  //   activeIcon: <AiOutlineInfoCircle className="text-2xl mr-2" />,
  // },
  {
    title: "Search",
    icon: <AiOutlineSearch className="text-2xl mr-2" />,
    activeIcon: <AiOutlineSearch className="text-2xl mr-2" />,
  },
  {
    title: "Learning Progress",
    icon: <AiOutlineCompass className="text-2xl mr-2" />,
    activeIcon: <AiFillCompass className="text-2xl mr-2" />,
  },
  {
    title: "Learning Plan",
    icon: <AiOutlineMessage className="text-2xl mr-2" />,
    activeIcon: <AiFillMessage className="text-2xl mr-2" />,
  },
  {
    title: "Notifications",
    icon: <AiOutlineHeart className="text-2xl mr-2" />,
    activeIcon: <AiFillHeart className="text-2xl mr-2" />,
  },
  {
    title: "Create Story",
    icon: <AiOutlineCamera className="text-2xl mr-2" />,
    activeIcon: <AiFillCamera className="text-2xl mr-2" />,
  },
  {
    title: "Create Post",
    icon: <AiOutlinePlusCircle className="text-2xl mr-2" />,
    activeIcon: <AiFillPlusCircle className="text-2xl mr-2" />,
  },
  {
    title: "Profile",
    icon: <CgProfile className="text-2xl mr-2" />,
    activeIcon: <CgProfile className="text-2xl mr-2" />,
  },
];
