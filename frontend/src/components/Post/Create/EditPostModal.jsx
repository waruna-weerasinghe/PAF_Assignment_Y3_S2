import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  useToast,
  Box,
  Text,
  Input,
  Avatar,
  Textarea,
  Icon,
} from "@chakra-ui/react";
import { FaPhotoVideo } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { GrEmoji } from "react-icons/gr";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPOst } from "../../../Redux/Post/Action";
import { uploadToCloudinary } from "../../../Config/UploadToCloudinary";

const EditPostModal = ({ isOpen, onClose, post }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    caption: "",
    location: "",
    mediaUrls: [],
    id: null,
  });

  useEffect(() => {
    if (post) {
      setPostData({
        caption: post.caption || "",
        location: post.location || "",
        mediaUrls: post.mediaUrls || [],
        id: post.id,
      });
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setLoading(true);
      try {
        const imageUrl = await uploadToCloudinary(file);
        if (imageUrl) {
          setPostData((prev) => ({ ...prev, mediaUrls: [imageUrl] }));
          toast({
            title: "Image uploaded",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch {
        toast({
          title: "Upload failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "Invalid file",
        description: "Only images are allowed.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = () => {
    if (!postData.id) return;

    dispatch(
      editPOst({
        jwt: token,
        data: {
          id: postData.id,
          caption: postData.caption,
          location: postData.location,
          mediaUrls: postData.mediaUrls,
        },
      })
    );
    onClose();
  };

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="lg" overflow="hidden" boxShadow="lg">
        <ModalHeader px={6} py={4} borderBottom="1px solid #eee">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">Edit Post</Text>
            <Button
              onClick={handleSubmit}
              colorScheme="blue"
              size="sm"
              isLoading={loading}
              loadingText="Updating"
            >
              Update
            </Button>
          </Box>
        </ModalHeader>

        <ModalBody p={0}>
          <Box display="flex" flexDirection={{ base: "column", md: "row" }} h="70vh">
            {/* Left: Image */}
            <Box flex="1" position="relative" bg="gray.50" onClick={handleImageClick} cursor="pointer">
              {postData.mediaUrls?.length ? (
                <Box
                  position="relative"
                  h="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                >
                  <img
                    src={postData.mediaUrls[0]}
                    alt="Post"
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                  />
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="blackAlpha.500"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    opacity="0"
                    _hover={{ opacity: 1 }}
                    transition="all 0.3s"
                  >
                    Click to change image
                  </Box>
                </Box>
              ) : (
                <Box
                  h="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  color="gray.500"
                >
                  <FaPhotoVideo size={32} />
                  <Text mt={2}>Click to upload photo</Text>
                </Box>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </Box>

            {/* Divider */}
            <Box w="1px" bg="gray.200" display={{ base: "none", md: "block" }} />

            {/* Right: Form */}
            <Box flex="1" p={4}>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar size="sm" src={user?.reqUser?.image} />
                <Text ml={3} fontWeight="semibold">
                  {user?.reqUser?.username}
                </Text>
              </Box>

              <Textarea
                name="caption"
                placeholder="Write a caption..."
                value={postData.caption}
                onChange={handleInputChange}
                resize="none"
                rows={6}
                mb={2}
              />
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Icon as={GrEmoji} />
                <Text fontSize="sm" color="gray.500">
                  {postData.caption?.length}/2,200
                </Text>
              </Box>

              <Input
                name="location"
                placeholder="Add location"
                value={postData.location}
                onChange={handleInputChange}
                mb={2}
              />
              <Box display="flex" justifyContent="flex-end">
                <Icon as={GoLocation} color="gray.500" />
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditPostModal;
