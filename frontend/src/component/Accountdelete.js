import React, { useState } from "react";
import Toaster from "../Toaster/Toaster";
import callAPI from "../apiUtils/apiCall";
import { Backendapi } from "../apis/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
const Accountdelete = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState({
    status: "",
    message: "",
    key: 0,
  });
  const handleLogout = async (e) => {
    try {
      const response = await callAPI(
        Backendapi.deleteaccount,
        {},
        "post",
        {},
        true
      );
      navigate("/");
      if (response.status) {
        dispatch(logout());
        localStorage.clear();
      }
      setMessage({
        status: response.success,
        message: response.message,
        key: Date.now(),
      });
    } catch (error) {
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
          <h1
            className="font-semibold text-center mb-6"
            style={{ fontSize: "x-large" }}
          >
            Are you sure You want to logout
          </h1>
          <div className="flex justify-center gap-2">
            <button
              className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-primary text-white border px-4 py-2 rounded hover:bg-secondary transition duration-200"
              onClick={handleLogout}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accountdelete;
