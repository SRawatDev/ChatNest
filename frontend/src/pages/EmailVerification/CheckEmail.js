import React, { useState } from "react";
import { Backendapi } from "../../apis/api";
import callAPI from "../../apiUtils/apiCall";
import Toaster from "../../Toaster/Toaster";
import { useNavigate } from "react-router-dom";
function CheckEmail() {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    status: "",
    message: "",
    key: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await callAPI(
        Backendapi.emailVerify,
        {},
        "post",
        data,
        false
      );
      setMessage({
        status: response.status,
        message: response.message,
        key: Date.now(),
      });
      if (response.status === true) {
        setTimeout(() => {
          navigate("/passwordVerfication", { state: { UserId:response?.data?._id } });
        }, 2000);
      }
      
    } catch (error) {
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
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
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

export default CheckEmail;
