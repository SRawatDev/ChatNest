import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [imageUpload, setImageUpload] = useState({
    tempImage: "",
  });
  const UploadImage = (e, allowedFileTypes) => {
    let file = e?.target?.files[0];
    console.log("Selected file:", file);

    if (file && allowedFileTypes.includes(file.type)) {
      setImageUpload({
        tempImage: URL.createObjectURL(file),
      });

      const formData = new FormData();
      formData.append("tempImage", file); 
      console.log("FormData content:", formData.get("tempImage"));
      axios
        .post("http://localhost:4000/v1/api/uploadImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Image upload response:", response);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      console.error("Unsupported file type or no file selected.");
    }
  };
  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4">
        <h3>Welcome to chat app</h3>
        <form action="">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your Name"
              className="bg-slate-50 px-2 py-1 focus:outline-primary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="bg-slate-50 px-2 py-1 focus:outline-primary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="bg-slate-50 px-2 py-1 focus:outline-primary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image">
              Image:
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary">
                <p className="text-sm">Upload your profile image</p>
              </div>
            </label>
            <input
              type="file"
              id="image"
              name="tempImage"
              onChange={(e) => UploadImage(e, allowedFileTypes)}
              className="bg-slate-50 px-2 py-1 focus:outline-primary hidden"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
