import React, { useState, useEffect } from "react";
import { Backendapi } from "../apis/api";
import callAPI from "../apiUtils/apiCall";
import Divider from "./Divider";
import Toaster from "../Toaster/Toaster";
import avavatar from "../assests/avavatar.avif";
import { baseUrl } from "../config/config";
function EditUserDetails({ onClose, data }) {
  console.log("=========", onClose);
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState(data || {});
  const [message, setMessage] = useState({
    status: "",
    message: "",
    key: 0,
  });
  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
  const UploadImage = async (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) =>
      allowedFileTypes.includes(file.type)
    );
    if (validFiles.length > 0) {
      const formData = new FormData();
      validFiles.forEach((file) => formData.append("tempImage", file));
      try {
        const response = await callAPI(
          Backendapi.imageUpload,
          {},
          "post",
          formData,
          false
        );
        setImageUrl(response?.path[0]);
      } catch (error) {
        setMessage({
          status: false,
          message: "connection not found",
          key: Date.now(),
        });
        console.error("Error uploading images:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const fetchData = async () => {
    try {
      const response = await callAPI(
        Backendapi.userProfile,
        {},
        "get",
        null,
        true
      );
      if (response.status) {
        setUserData(response.Data);
      }
    } catch (error) {
      setMessage({
        status: false,
        message: "connection not found",
        key: Date.now(),
      });
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userId: userData._id,
        profile_pic: imageUrl ? imageUrl : userData?.profile_pic,
        name: userData.name,
        email: userData.email,
      };
      const response = await callAPI(
        Backendapi.updateUserProfile,
        {},
        "post",
        data,
        true
      );
      setMessage({
        status: response.status,
        message: response.message,
        key: Date.now(),
      });
      

      if (response.status) {
        localStorage.setItem("profileImage", response?.Data?.profile_pic);
       
      }
      await fetchData();
      setTimeout(()=>{
        onClose();
      },1000)
      
    } catch (error) {
      console.log("errr", error);

      setMessage({
        status: false,
        message: error.message,
        key: Date.now(),
      });
    }
  };

  return (
    <>
      <Toaster
        message={message.message}
        status={message.status}
        key={message.key}
      />

      <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
        <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
          <h2 className="font-semibold">Profile Details</h2>
          <p className="text-sm">Edit user details</p>
          <form
            className="grid gap-6 mt-3 p-4 border rounded shadow-lg max-w-md mx-auto bg-white"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="my-2">
                <label htmlFor="profile_pic">
                  <div className="relative">
                    <img
                      src={`${baseUrl.productionUrl}/images/${userData.profile_pic}`}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = avavatar;
                      }}
                    />
                    <button className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs rounded-full p-1">
                      Change
                    </button>
                  </div>
                </label>
                <input
                  type="file"
                  id="profile_pic"
                  className="hidden"
                  onChange={UploadImage}
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name" className="font-semibold">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={userData?.name || ""}
                  className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="email" className="font-semibold">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={userData?.email || ""}
                  className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <Divider className="my-4" />
            <div className="flex gap-2 w-fit ml-auto">
              <button
                className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition duration-200"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="bg-primary text-white border px-4 py-2 rounded hover:bg-secondary transition duration-200">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default EditUserDetails;
