import React, { useEffect, useState } from "react";
import logo from "../../assests/logo.png";
import "./home.css";
import callAPI from "../../apiUtils/apiCall";
import { Backendapi } from "../../apis/api";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import MessagePage from "../../component/MessagePage";
import { useDispatch, useSelector } from "react-redux";
import { logout, setSocketConnection } from "../../redux/userSlice";
import io from "socket.io-client";
import { setOnlineUser } from "../../redux/userSlice";
import Avatar from "../../component/Avatar";
import { baseUrl } from "../../config/config";

function Home() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  console.log("online user", user);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState();

  const handleToggle = () => setExpanded(!expanded);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callAPI(
          Backendapi.allactiveUserList,
          {},
          "get",
          null,
          true
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const basePath = location.pathname === "/home";

  // socket connection
  useEffect(() => {
    try {
      const socketconnection = io(`${baseUrl.productionUrl}`, {
        auth: {
          token: localStorage.getItem("UserTokken"),
        },
      });
      dispatch(setSocketConnection(socketconnection));
      socketconnection.on("onlineUser", (data) => {
        console.log(data);
        dispatch(setOnlineUser(data));
      });
      return () => {
        socketconnection.disconnect(); 
      };
      
    } catch (error) {
      console.log(error);
    }
  
  }, []);


  return (
    <>
      <div className="grid lg:grid-cols-[400px,1fr] h-screen max-h-screen">
        <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
          <Sidebar />
        </section>
        <section className={`${basePath && "hidden"}`}>
          <Outlet />
        </section>

        <div
          className={`justify-center items-center flex-col gap-2 hidden ${
            !basePath ? "hidden" : "lg:flex"
          }`}
        >
          <div>
            <img src={logo} width={250} alt="logo" />
          </div>
          <p className="text-lg mt-1 text-slate-500">
            Select user to send message
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
