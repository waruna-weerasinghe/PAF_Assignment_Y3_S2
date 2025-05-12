import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserDetailsAction,
  getUserProfileAction,
} from "../../Redux/User/Action";
import { useToast } from "@chakra-ui/react";
import ChangeProfilePhotoModal from "./ChangeProfilePhotoModal";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";


const EditProfileForm = () => {
  const { user } = useSelector((store) => store);
  const toast = useToast();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile,setImageFile]=useState(null);

  const [initialValues, setInitialValues] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    mobile: "",
    gender: "",
    website: "",
    private: false,
    
  });
  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  useEffect(() => {
    console.log("reqUser", user.reqUser);
    const newValue = {};

    for (let item in initialValues) {
      if (user.reqUser && user.reqUser[item]) {
        newValue[item] = user.reqUser[item];
      }
    }

    console.log("new value -: ", newValue);

    formik.setValues(newValue);
  }, [user.reqUser]);

  const formik = useFormik({
    initialValues: { ...initialValues },
    onSubmit: (values) => {
      const data = {
        jwt: token,
        data: { ...values, id: user.reqUser?.id },
      };
      dispatch(editUserDetailsAction(data));
      toast({
        title: "Account updated...",

        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  async function handleProfileImageChange(event) {
    const selectedFile = event.target.files[0];
    const image = await uploadToCloudinary(selectedFile);
    setImageFile(image)
    const data = {
      jwt: token,
      data: { image, id: user.reqUser?.id },
    };
    dispatch(editUserDetailsAction(data))

    // dispatch(getUserProfileAction(token))

    onClose();
  }

  // console.log("initial value ---- ", initialValues);

  return (
    <div className="bg-[#E6F7FF] rounded-lg p-8 shadow-md">
  <div className="flex items-center pb-7">
    <div className="w-[15%]">
      <img
        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-sky-300"
        src={
          imageFile ||
          user.reqUser?.image ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        alt="Profile"
      />
    </div>

    <div>
      <p className="font-semibold">{user.reqUser?.username}</p>
      <p
        onClick={onOpen}
        className="font-bold text-blue-700 hover:underline cursor-pointer text-sm"
      >
        Change Profile Photo
      </p>
    </div>
  </div>

  <form onSubmit={formik.handleSubmit}>
    <Stack spacing="6">
      <FormControl className="flex items-start" id="name">
        <FormLabel className="w-[20%] pt-2 font-medium">Name</FormLabel>
        <div className="w-full">
          <Input
            placeholder="Name"
            type="text"
            bg="white"
            {...formik.getFieldProps("name")}
          />
          <FormHelperText fontSize="xs">
            Help people discover your account by using a recognizable name.
          </FormHelperText>
        </div>
      </FormControl>

      <FormControl className="flex items-start" id="username">
        <FormLabel className="w-[20%] pt-2 font-medium">Username</FormLabel>
        <div className="w-full">
          <Input
            placeholder="Username"
            type="text"
            bg="white"
            {...formik.getFieldProps("username")}
          />
          <FormHelperText fontSize="xs">
            You can change your username back within 14 days.
          </FormHelperText>
        </div>
      </FormControl>

      <FormControl className="flex items-start" id="website">
        <FormLabel className="w-[20%] pt-2 font-medium">Website</FormLabel>
        <div className="w-full">
          <Input
            placeholder="Website"
            type="text"
            bg="white"
            {...formik.getFieldProps("website")}
          />
        </div>
      </FormControl>

      <FormControl className="flex items-start" id="bio">
        <FormLabel className="w-[20%] pt-2 font-medium">Bio</FormLabel>
        <div className="w-full">
          <Textarea
            placeholder="Tell something about yourself"
            bg="white"
            {...formik.getFieldProps("bio")}
          />
        </div>
      </FormControl>

      <div className="py-6">
        <p className="font-semibold text-sm">Personal Information</p>
        <p className="text-xs text-gray-600">
          This won’t be visible on your public profile.
        </p>
      </div>

      <FormControl className="flex items-start" id="email">
        <FormLabel className="w-[20%] pt-2 font-medium">Email</FormLabel>
        <div className="w-full">
          <Input
            placeholder="Email"
            type="email"
            bg="white"
            {...formik.getFieldProps("email")}
          />
        </div>
      </FormControl>

      <FormControl className="flex items-start" id="mobile">
        <FormLabel className="w-[20%] pt-2 font-medium">Phone</FormLabel>
        <div className="w-full">
          <Input
            placeholder="Phone"
            type="tel"
            bg="white"
            {...formik.getFieldProps("mobile")}
          />
        </div>
      </FormControl>

      <FormControl className="flex items-start" id="gender">
        <FormLabel className="w-[20%] pt-2 font-medium">Gender</FormLabel>
        <div className="w-full">
          <Input
            placeholder="Gender"
            type="text"
            bg="white"
            {...formik.getFieldProps("gender")}
          />
        </div>
      </FormControl>

      <div>
        <Button colorScheme="blue" type="submit" className="w-full md:w-auto">
          Save Changes
        </Button>
      </div>
    </Stack>
  </form>

  <ChangeProfilePhotoModal
    handleProfileImageChange={handleProfileImageChange}
    isOpen={isOpen}
    onClose={onClose}
    onOpen={onOpen}
  />
</div>

  );
};

export default EditProfileForm;
