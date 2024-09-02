import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import SearchUser from "./SearchUser";
import Avatar from "./Avatar";
import Logout from "./Logout";
import GroupChat from "./Groupchat";
import callAPI from "../apiUtils/apiCall";
import { Backendapi } from "../apis/api";
import Toaster from "../Toaster/Toaster";
import chatimg from "../assests/chatapp.webp";
import avavatar from "../assests/avavatar.avif";
import Accountdelete from "./Accountdelete";
import { baseUrl } from "../config/config";
function Sidebar() {
  const [account, setaccount] = useState(false);
  const [message, setMessage] = useState({
    status: "",
    message: "",
    key: 0,
  });
  const [roomdata, setroom] = useState();
  const [group, setgroup] = useState(false);
  const [logouttoglle, setlogouttoglle] = useState(false);
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const user = useSelector((state) => state.user);
  const [edituser, setEdituser] = useState(false);
  const [userconversation, setuserconversation] = useState([]);

  const handleuserconversation = async () => {
    try {
      const response = await callAPI(
        Backendapi.getconversation,
        {},
        "get",
        null,
        true
      );

      if (!response.status) {
        setMessage({
          status: response.status,
          message: response.message,
          key: Date.now(),
        });
      }
      setuserconversation(response?.data);
    } catch (error) {
      setMessage({
        status: false,
        message: error.message,
        key: Date.now(),
      });
    }
  };

  const getroomInfo = async () => {
    try {
      const response = await callAPI(
        Backendapi.userRoominfo,
        {},
        "get",
        null,
        true
      );
      setroom(response?.data);
      if (!response.status) {
        setMessage({
          status: response.status,
          message: response.message,
          key: Date.now(),
        });
      }
    } catch (error) {
      console.log(error);

      setMessage({
        status: false,
        message: error.message,
        key: Date.now(),
      });
    }
  };
  useEffect(() => {
    handleuserconversation();
    getroomInfo();
  }, []);

  return (
    <>
      <Toaster
        message={message.message}
        status={message.status}
        key={message.key}
      />
      <div className="w-full h-full flex">
        <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
          <div>
            <NavLink
              className={({ isActive }) =>
                `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                  isActive && "bg-slate-200"
                }`
              }
              title="chat"
            >
              <i className="fa-solid fa-trash text-2xl" onClick={()=>setaccount(true)}></i>
            </NavLink>
            <div
              className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
              title="user"
              onClick={() => setOpenSearchUser(true)}
            >
              <i className="fa-solid fa-user-plus text-2xl"></i>
            </div>
            <div
              className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
              title="user"
              onClick={() => setgroup(true)}
            >
              <i className="fa-solid fa-users-line text-2xl"></i>
            </div>
          </div>
          <div>
            <div
              className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
              title="User"
            >
              <button onClick={() => setEdituser(true)}>
                <Avatar />
              </button>
            </div>
            <div
              className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
              title="logout"
            >
              <i
                className="fa-solid fa-right-from-bracket text-2xl"
                onClick={() => setlogouttoglle(true)}
              ></i>
            </div>
          </div>
        </div>
        {edituser && (
          <EditUserDetails onClose={() => setEdituser(false)} data={user} />
        )}
        {openSearchUser && (
          <SearchUser onClose={() => setOpenSearchUser(false)} />
        )}
     {group && <GroupChat onClose={() => setgroup(false)} />}

        {logouttoglle && <Logout onClose={() => setlogouttoglle(false)} />}
        {account && <Accountdelete onClose={() => setaccount(false)} />}

        <div className="flex-1 p-4">
          <div className="h-16 flex items-center">
            <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2>
          </div>
          <div className=" p-[0.5px]">
            {userconversation?.map((item, index) => {
              return (
                <Link>
                  <Link to={"/home/" + item?.user?._id} key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                        margin: "10px 0",
                        flexDirection: "row-reverse",
                        padding: "15px",
                        height: "70px",
                        borderRadius: "10px",
                        background: `url(${chatimg}) no-repeat center center/cover`, // Example background image
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        transition:
                          "background-color 0.3s ease, transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(0, 0, 0, 0.7)";
                        e.currentTarget.style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <div></div>
                      <div style={{ textAlign: "center", color: "white",margin:"auto" }}>
                        <p>{item?.messages[0]?.text}</p>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={
                            `${baseUrl.productionUrl}/images/` +
                            item?.user?.profile_pic
                          }
                          alt="click here"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = avavatar;
                          }}
                          style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                            transition: "transform 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "Arial, sans-serif",
                            margin: "0 15px 0 0",
                            fontSize: "14px",
                            margin: "auto",
                            fontWeight: "700",
                            color: "#fff",
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                          }}
                        >{item?.user?.name}</p>
                      </div>
                    </div>
                  </Link>
                </Link>
              );
            })}
            {roomdata?.map((item, index) => {
              return (
                <Link to={"/home/groupchat/" + item?._id} key={index}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: "10px 0",
                      flexDirection: "row-reverse",
                      padding: "15px",
                      height: "70px",
                      borderRadius: "10px",
                      background: `url(${chatimg}) no-repeat center center/cover`, // Example background image
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                      transition:
                        "background-color 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(0, 0, 0, 0.7)";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "Arial, sans-serif",
                          margin: "0 15px 0 0",
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#fff",
                          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        {item?.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "Arial, sans-serif",
                          margin: "5px 15px 0 0",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#fff",
                          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        Created {new Date(item?.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <img
                        src={item?.image}
                        alt="click here"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = avavatar;
                        }}
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                          transition: "transform 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "Arial, sans-serif",
                          margin: "0 15px 0 0",
                          fontSize: "14px",
                          margin: "auto",
                          fontWeight: "700",
                          color: "#fff",
                          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        Group
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
