import React, { useState } from "react";
import { Backendapi } from "../../apis/api";
import callAPI from "../../apiUtils/apiCall";
import { useNavigate } from "react-router-dom";
import Toaster from "../../Toaster/Toaster";
import { Link } from "react-router-dom";
import bg from "../../assests/bgchat.jpg"
import "../../App.css"

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState({
    status: "",
    message: "",
    key: 0,
  });
  const [imageUrl, setImageUrl] = useState("");
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
        if (!response?.status) {
          setMessage({
            status: response?.status,
            message: response.message,
            key: Date.now(),
          });
        }
        setImageUrl(response?.path[0]);
      } catch (error) {
        setMessage({
          status: false,
          message: error.message,
          key: Date.now(),
        });
        console.error("Error uploading images:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      return;
    }
    try {
      const requestData = { ...data, profile_pic: imageUrl };
      const response = await callAPI(
        Backendapi.register,
        {},
        "post",
        requestData,
        false
      );
      console.log("ksdjsd", response);
      setMessage({
        status: response.status,
        message: response.message,
        key: Date.now(),
      });
      if (response.status === true) {
        setTimeout(() => {
          navigate("/emailVerification");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div >
      <Toaster
        message={message.message}
        status={message.status}
        key={message.key}
      />
      <div className="mt-5 flex justify-center"  >
        <div className="bg-white w-full max-w-md mx-2 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">
            Welcome to the Chat App
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your Name"
                  value={data.name}
                  onChange={handleChange}
                  name="name"
                  required
                  className="bg-slate-50 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={handleChange}
                  name="email"
                  required
                  className="bg-slate-50 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={handleChange}
                  name="password"
                  required
                  className="bg-slate-50 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="image" className="font-medium text-gray-700 ">
                  Image:
                  <div className="h-14 bg-slate-200 flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg hover:border-primary">
                    <p className="text-sm">
                      {" "}
                      {imageUrl ? imageUrl : "Upload your profile image"}
                    </p>
                  </div>
                </label>
                <input
                  type="file"
                  id="image"
                  name="tempImage"
                  onChange={UploadImage}
                  className="bg-slate-50 px-2 py-1 focus:outline-primary hidden"
                  multiple
                  required
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
          <p className="my-3 text-center">
            Already have account ?{" "}
            <Link
              to={"/emailVerification"}
              className="hover:text-primary font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
