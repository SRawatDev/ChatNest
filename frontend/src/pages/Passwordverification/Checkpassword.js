import React from "react";
import Toaster from "../../Toaster/Toaster";
import { Backendapi } from "../../apis/api";
import callAPI from "../../apiUtils/apiCall";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

function Checkpassword() {
  const location = useLocation();
  const { UserId } = location.state || {};
  const [data, setData] = useState({
    password: "",
    userId: UserId,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    status: "",
    message: "",
    key: 0,
  });
  const URL = baseUrl.productionUrl + Backendapi.passwordVerify;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: URL,
        data,
        withCredentials: true,
      });
      setMessage({
        status: response?.data?.status,
        message: response?.data?.message,
        key: Date.now(),
      });     
      if (response?.data?.status == true) {

        localStorage.setItem("UserTokken", response?.data?.data?.tokken);
        localStorage.setItem("userId",response?.data?.data?._id)
        localStorage.setItem("profileImage",response?.data?.data?.profile_pic)
        dispatch(setUser(response?.data?.data));
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      setMessage({
        status: false,
        message: error.message,
        key: Date.now(),
      });
      
      console.log("Error during registration:", error.message);
    }
  };

  return (
    <>
      <Toaster
        message={message.message}
        status={message.status}
        key={message.key}
      />
      <div className="mt-5 flex justify-center">
        <div className="bg-white w-full max-w-md mx-2 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            Welcome to the Chat App
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  id="email"
                  placeholder="Enter your password"
                  name="password"
                  required
                  value={data.password}
                  onChange={handleChange}
                  className="bg-slate-50 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkpassword;
