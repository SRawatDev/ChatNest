import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import backgroundImage from "../assests/wallapaper.jpeg";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import uploadFile from "../helper/uploadFile";
import avavatar from "../assests/avavatar.avif";
import moment from "moment";
import "./app.css";
import Groupusers from "./Groupusers";
const Groupchats = () => {
  const [showGroupUsers, setShowGroupUsers] = useState(false);
  const userId = localStorage.getItem("userId");
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const [history, sethistory] = useState();
  const { roomId } = useParams();
  const [groupMessage, setgroupmessage] = useState({
    senderId: localStorage.getItem("userId"),
    roomId: roomId,
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("History updated:", history);
  }, [history]);
  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("fetchHistoricalMessages", { roomId });
      const handleGroupMessages = (data) => {
        sethistory(data);
      };
      const handlehistoy = (data) => {
        sethistory(data);
      };
      socketConnection.on("historygoupmessage", handlehistoy);
      socketConnection.on("groupMessages", handleGroupMessages);

      return () => {
        socketConnection.off("groupMessages", handleGroupMessages);
        socketConnection.off("historygoupmessage", handlehistoy);
      };
    }
  }, [socketConnection, roomId]);

  const handleClearUploadImage = () => {
    setgroupmessage((preve) => {
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

    setgroupmessage((preve) => {
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

    setgroupmessage((preve) => {
      return {
        ...preve,
        videoUrl: uploadPhoto.url,
      };
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setgroupmessage({ ...groupMessage, [name]: value });
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (groupMessage.imageUrl || groupMessage.text || groupMessage.videoUrl) {
        if (socketConnection) {
          socketConnection.emit("group-message", groupMessage);
          setgroupmessage((prev) => ({
            ...prev,
            text: groupMessage.text,
            imageUrl: groupMessage.imageUrl,
            videoUrl: groupMessage.videoUrl,
          }));
        }
        setgroupmessage({
          senderId: localStorage.getItem("userId"),
          roomId: roomId,
          text: "",
          imageUrl: "",
          videoUrl: "",
        });
      }
    } catch (error) {}
  };
  const handleClearUploadVideo = () => {
    setgroupmessage((preve) => {
      return {
        ...preve,
        videoUrl: "",
      };
    });
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
              src={history?.image}
              alt=""
              height={80}
              width={60}
              style={{
                borderRadius: "50%",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = avavatar;
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              {history?.name}
            </h3>
          </div>
        </div>
        <div>
          <button className="cursor-pointer hover:text-primary" onClick={handleToggleGroupUsers}>
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>
      </header>
      {/* show all message */}
      <section className="h-[calc(100vh-128)] overflow-x-hidden overflow-y-scroll scrollbar" style={{height:"88%"}}>
        {groupMessage.imageUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
              onClick={handleClearUploadImage}
            >
              <i class="fa-solid fa-xmark text-2xl"></i>
            </div>
            <div className="bg-white p-3">
              <img
                src={groupMessage.imageUrl}
                alt="uploadImage"
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
              />
            </div>
          </div>
        )}
        {/**upload video display */}
        {groupMessage.videoUrl && (
          <div className="w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600"
              onClick={handleClearUploadVideo}
            >
              <i class="fa-solid fa-xmark text-2xl"></i>
            </div>
            <div className="bg-white p-3">
              <video
                src={groupMessage.videoUrl}
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
        <div  style={{overflowY:"auto",paddingBottom:"60px"}}>
          {history?.messages?.map((item) => (
            <div
              style={{
                backgroundColor: "#00FF00",
                margin: "3px",
                color: "white",
                borderRadius: "20px",
                fontWeight: "bold",
                borderTopRightRadius: "0",
              }}
              key={item._id}
              className={`p-1 py-1 mg-2  w-fit max-w-[280pcx] md:max-w-sm lg:max-w-md ${
                localStorage.getItem("userId") === item?.msgByUserId
                  ? "ml-auto"
                  : "bg-#00FF00 mg-3"
              }`}
            >
              <div className="w-full relative">
                {item?.imageUrl && (
                  <img
                    src={item?.imageUrl}
                    className="w-full h-full object-scale-down"
                  />
                )}
                {item?.videoUrl && (
                  <video
                    src={item.videoUrl}
                    className="w-full h-full object-scale-down"
                    controls
                  />
                )}
              </div>
              <p
                className="px-2"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "5px",
                  marginBottom: "6px",
                }}
              >
                <span
                  className="name-highlight"
                  style={{ textAlign: "center" }}
                >
                  {item?.userInfo?.name}
                </span>
                <span>{item.text}</span>
              </p>

              <p className="text-xs ml-auto w-fit">
                {moment(item.createdAt).format("hh:mm")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* send message */}
      <section
        className="h-16 bg-white flex items-center px-4"
        style={{ position: "fixed", bottom: "0", width: "100%" }}
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
            value={groupMessage.text}
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
          <Groupusers Roomusers={history?.users} close={() => setShowGroupUsers(false)} />
        </div>
      )}
    </div>
  );
};

export default Groupchats;
