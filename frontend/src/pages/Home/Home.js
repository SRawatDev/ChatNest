import React, { useEffect, useState } from "react";
import logo from "../../assests/logo.png";
import "./home.css";
import callAPI from "../../apiUtils/apiCall";
import { Backendapi } from "../../apis/api";
import { Outlet } from "react-router-dom";
import Sidebar from "../../component/Sidebar";
import MessagePage from "../../component/MessagePage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

function Home() {
  const user=useSelector((state)=>state.user)
  const dispatch=useDispatch()
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

  
  return (
    <>
      <div className="grid grid-cols-[300px,1fr] h-screen  max-h-screen">
        <section className="bg-white">
          <Sidebar />
        </section>
        <section>
  
          <MessagePage />
        </section>
      </div>
    </>
  );
}

export default Home;
