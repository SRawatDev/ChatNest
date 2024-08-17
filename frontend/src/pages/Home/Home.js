import React, { useEffect, useState } from "react";
import logo from "../../assests/logo.png"; // Fixed typo in assets
import "./home.css";
import callAPI from "../../apiUtils/apiCall";
import { Backendapi } from "../../apis/api";
function Home() {
  const [expanded, setExpanded] = useState(false);
  const [data, setdata] = useState();
  const handleToggle = () => setExpanded(!expanded);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callAPI(
          Backendapi.allactiveUserList,
          {},
          "get",
          {},
          false
        );
        setdata(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [0]);
  return (
    <div>
      <div className="dash-navbar">
        <div
          className={expanded ? "hamburger1 expanded" : "hamburger1"}
          onClick={handleToggle}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="logo-of-prepbytes">
          <img src={logo} alt="image not found" />
        </div>
      </div>
      <div className="dashboard-toggle">
        <div
          className={
            expanded
              ? "inner-dashboard-detail expanded"
              : "inner-dashboard-detail"
          }
        >
          {expanded && (
            <h1>
              <i className="fa-solid fa-book"></i> Users
            </h1>
          )}
          <div>
            {data?.map((item, key) => {
              return (
                <>
                  <h3>{item?.name}</h3>
                  <img src={item.profile_pic} />
                </>
              );
            })}
          </div>
        </div>
        <div className="dashboard-empty">
          <div class="message-container">
            <input
              type="text"
              name="message"
              id="message"
              class="message-sent"
              placeholder="Type your message..."
            />
            <button type="button" class="send-button">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
