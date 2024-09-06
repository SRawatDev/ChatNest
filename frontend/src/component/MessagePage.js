import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import backgroundImage from "../assests/wallapaper.jpeg";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import uploadFile from "../helper/uploadFile";
import avavatar from "../assests/avavatar.avif";
import "./app.css";
import { useLocation } from 'react-router-dom';
import Groupusers from "./Groupusers";

import { baseUrl } from "../config/config";
function MessagePage() {
  const [showGroupUsers, setShowGroupUsers] = useState(false);
  const location = useLocation();
  const { userId } = useParams();
  const [allmessage, setallmessage] = useState([]);
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useData, setUserData] = useState({
    name: "",
    email: "",
    online: false,
    profile_pic: "",
    _id: "",
  });

  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const socketConnection = useSelector(
    (state) => state?.user?.  socketConnection
  );

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", userId);
      socketConnection.on("messageUser", (data) => {


        setUserData(data);
      });
      socketConnection.on("message", (data) => {
        setallmessage(data);
      });
    }
  }, [socketConnection, userId]);
  const handleClearUploadImage = () => {
    setMessage((preve) => {
      return {
        ...preve,
        imageUrl: "",
      };
    });
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);

    setMessage((preve) => {
      return {
        ...preve,
        imageUrl: uploadPhoto.url,
      };
    });
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];

    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);

    setMessage((preve) => {
      return {
        ...preve,
        videoUrl: uploadPhoto.url,
      };
    });
  };
  const handleClearUploadVideo = () => {
    setMessage((preve) => {
      return {
        ...preve,
        videoUrl: "",
      };
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (message.imageUrl || message.text || message.videoUrl) {
        if (socketConnection) {
          socketConnection.emit("new message", {
            sender: localStorage.getItem("userId"),
            reciever: userId,
            text: message.text,
            imageUrl: message.imageUrl,
            videoUrl: message.videoUrl,
            msgByUserId: localStorage.getItem("userId"),
          });
          setMessage({
            text: "",
            imageUrl: "",
            videoUrl: "",
          });
        }
      }
    } catch (error) {}
  };
  const handleToggleGroupUsers = () => {
    setShowGroupUsers((prev) => !prev);
  };



  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "100vh",
        overflowY: "auto",
      }}
      
      className="bg-no-repeat bg-cover"
    >
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link to={"/home"} className="lg:hidden">
            <i class="fa-solid fa-angles-left text-2xl"></i>
          </Link>
          <div>
  
            <img
              src={`${baseUrl.productionUrl}/images/${useData?.profile_pic}`}
              alt=""
              height={50}
              width={50}
              style={{
                borderRadius: "50%",
                height:"50px",
                border: useData.online ? "4px solid green" : "4px solid red", // Conditional border color
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = avavatar;
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              {useData?.name}
            </h3>
            <p className="-my-2 text-sm">
              {useData?.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer hover:text-primary" onClick={handleToggleGroupUsers}>
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </header>
      {/* show all message */}
      <section className="h-[calc(100vh-128)] overflow-x-hidden overflow-y-scroll scrollbar">
        {/* upload image display    */}
        {/**upload Image display */}
        {message.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
              onClick={handleClearUploadImage}
            >
              <i class="fa-solid fa-xmark text-2xl"></i>
            </div>
            <div className="bg-white p-3">
              <img
                src={message.imageUrl}
                alt="uploadImage"
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
              />
            </div>
          </div>
        )}
        {/**upload video display */}
        {message.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
              onClick={handleClearUploadVideo}
            >
              <i class="fa-solid fa-xmark text-2xl"></i>
            </div>
            <div className="bg-white p-3">
              <video
                src={message.videoUrl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                controls
                muted
                autoPlay
              />
            </div>
          </div>
        )}
        {loading && (
          <div className="w-full h-full flex sticky bottom-0 justify-center items-center">
            <Loading />
          </div>
        )}

        {/* all message will show here */}
        <div>
          {allmessage?.map((msg, index) => {
            return (
              <div  style={{
                backgroundColor: "#00FF00",
                margin: "3px",
                color: "white",
                borderRadius: "20px",
                fontWeight: "bold",
                borderTopRightRadius: "0",
              }}
                className={`p-1 py-1  w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
                  localStorage.getItem("userId") === msg?.msgByUserId
                    ? "ml-auto"
                    : "bg-#00FF00 mg-3"
                }`}
              >
                <div className="w-full relative">
                  {msg?.imageUrl && (
                    <img
                      src={msg?.imageUrl}
                      className="w-full h-full object-scale-down"
                    />
                  )}
                  {msg?.videoUrl && (
                    <video
                      src={msg.videoUrl}
                      className="w-full h-full object-scale-down"
                      controls
                    />
                  )}
                </div>
                <p className="px-2">{msg.text}</p>
                <p className="text-xs ml-auto w-fit">
                  {moment(msg.createdAt).format("hh:mm")}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* send message */}
      <section
        className="h-16 bg-white flex items-center px-4"
        style={{ position: "absolute", bottom: "0", width: "100%" }}
      >
        <div className="relative">
          <button
            onClick={() => setOpenImageVideoUpload(!openImageVideoUpload)}
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
          >
            <i className="fa-solid fa-plus text-2xl"></i>
          </button>
          {/* video and image  */}

          {openImageVideoUpload && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-primary">
                    <i class="fa-solid fa-image text-2xl"></i>
                  </div>
                  <p>Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-purple-500">
                    <i class="fa-solid fa-video text-2xl"></i>
                  </div>
                  <p>Video</p>
                </label>

                <input
                  type="file"
                  id="uploadImage"
                  onChange={handleUploadImage}
                  className="hidden"
                />

                <input
                  type="file"
                  id="uploadVideo"
                  onChange={handleUploadVideo}
                  className="hidden"
                />
              </form>
            </div>
          )}
        </div>
        <form className="h-full w-full flex gap-2" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type here message..."
            className="py-1 px-4 outline-none w-full h-full"
            value={message.text}
            name="text"
            onChange={handleOnChange}
          />
          <button className="mt-3 text-primary hover:text-secondary responseive">
            send
          </button>
        </form>
      </section>
      {showGroupUsers && (
        <div className="overlay" onClick={() => setShowGroupUsers(false)}>
          <Groupusers Roomusers={[useData]} close={() => setShowGroupUsers(false)} />
        </div>
      )}

    </div>
  );
}

export default MessagePage;
