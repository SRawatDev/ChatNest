import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Backendapi } from "../apis/api";
import callAPI from "../apiUtils/apiCall";
import Toaster from "../Toaster/Toaster";
import Chip from "@mui/material/Chip"; // Import Chip from Material UI
import Groupcard from "./Groupcard";
import uploadFile from "../helper/uploadFile";
const GroupChat = ({ onClose }) => {
  
  const [loading, setLoading] = useState(false);
  const [groupname, setgroupname] = useState({
    name: "",
    image: "",
    users: [localStorage.getItem("userId")], // Store only user IDs here
  });
  const [message, setMessage] = useState({
    status: "",
    message: "",
    key: 0,
  });
  const [searchUser, setSearchUser] = useState([]);
  const [imageloading, setImageLoading] = useState(false);
  const [search, setSearch] = useState({ search: "" });

  const allActiveUser = async (searchParam = "") => {
    try {
      setLoading(true);
      const responseData = await callAPI(
        Backendapi.allactiveUserList,
        { search: searchParam },
        "get",
        null,
        true
      );
      setLoading(false);
      setSearchUser(responseData?.data);
      console.log("Fetched user data:", responseData.data);
    } catch (error) {
      setLoading(false);
      setMessage({
        status: false,
        message: "connection not found",
        key: Date.now(),
      });
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      allActiveUser(search.search);
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [search.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handlegroupchange = (e) => {
    const { name, value } = e.target;
    setgroupname({ ...groupname, [name]: value });
  };

  const handleUserSelect = (user) => {
    if (!groupname.users.includes(user._id)) {
      setgroupname((prevState) => ({
        ...prevState,
        users: [...prevState.users, user._id],
      }));
    }
  };

  const handleDeleteChip = (userId) => {
    setgroupname((prevState) => ({
      ...prevState,
      users: prevState.users.filter((id) => id !== userId),
    }));
  };
  const handleCreateRoom = async (e) => {
    try {
      const response = await callAPI(
        Backendapi.createRoom,
        {},
        "Post",
        groupname,
        true
      );
      if (response.status) {
        setTimeout(() => {
          setMessage({
            status: response.status,
            message: response.message,
            key: Date.now(),
          });
        }, 1000);
      }

      setMessage({
        status: response.status,
        message: response.message,
        key: Date.now(),
      });
    } catch (error) {
      console.log(error);
      setMessage({
        status: false,
        message: error.message,
        key: Date.now(),
      });
    }
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setImageLoading(true);
    const uploadPhoto = await uploadFile(file);
    setImageLoading(false);

    setgroupname((preve) => {
      return {
        ...preve,
        image: uploadPhoto.url,
      };
    });
  };
  return (
    <>
      <Toaster
        message={message.message}
        status={message.status}
        key={message.key}
      />

      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-10">
        <div className="w-full max-w-lg mx-auto mt-10 relative">
          {imageloading && (
            <div className="w-full h-full flex sticky bottom-0 justify-center items-center">
              <Loading />
            </div>
          )}
          <div className="bg-white rounded h-14 overflow-hidden flex mb-3">
            <input
              type="text"
              value={groupname.name}
              name="name"
              onChange={handlegroupchange}
              placeholder="Group name"
              className="w-full outline-none px-4"
            />
            <button
              style={{
                background: "rgb(0, 255, 0)",
                color: "white",
                borderRadius: "5px",
                width: "100px",
                fontWeight: "bold",
              }}
              onClick={handleCreateRoom}
            >
              Create{" "}
            </button>
          </div>
          <div>
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex items-center justify-center w-full h-14 bg-gray-200 text-gray-700 rounded border border-gray-300 hover:bg-gray-300 transition-all duration-300"
            >
              <input
                type="file"
                id="file-upload"
                name="file"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
              <span className="flex items-center">
                <i className="fa-solid fa-upload mr-2"></i> Upload image
              </span>
            </label>
          </div>

          <div className="bg-white rounded h-14 overflow-hidden flex">
            <input
              type="text"
              value={search.search}
              onChange={handleChange}
              name="search"
              placeholder="Search user by name, email..."
              className="w-full outline-none py-1 h-full px-4"
            />
            <div className="h-14 w-14 flex justify-center items-center">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {groupname.users.map((userId) => {
              const user = searchUser.find((user) => user._id === userId);
              return user ? (
                <Chip
                  key={user._id}
                  label={user.name}
                  style={{
                    background: "white",
                    borderRadius: "5px",
                    border: "none",
                    height: "50px",
                  }}
                  onDelete={() => handleDeleteChip(user._id)}
                />
              ) : null;
            })}
          </div>

          <div
            className="bg-white mt-2 w-full p-4 rounded"
            style={{ height: "442px", overflowY: "auto" }}
          >
            {searchUser.length === 0 && !loading && (
              <p className="text-center text-slate-500">No user found!</p>
            )}

            {loading && (
              <div>
                <Loading />
              </div>
            )}

            {searchUser.length !== 0 &&
              !loading &&
              searchUser.map((user) => (
                <Groupcard
                  key={user._id}
                  user={user}
                  onClose={onClose}
                  onClick={() => handleUserSelect(user)} // Pass the click handler here
                />
              ))}
          </div>
        </div>
        <div
          className="absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white cursor-pointer"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </>
  );
};

export default GroupChat;
