import React, { useState } from "react";
import { Link } from "react-router-dom";
import avavatar from "../assests/avavatar.avif";
import gemni from "../assests/gemni.jpg";
import backgroundImage from "../assests/wallapaper.jpeg";
import axios from "axios";

const Gemniai = () => {
  const [gemniai, setGemniai] = useState([]);
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = { contents: [{ parts: [{ text: message }] }] };
      const gemnires = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API}`,
        content
      );

      setGemniai((prevState) => [
        ...prevState,
        {
          message: message,
          reply: gemnires?.data?.candidates[0]?.content?.parts[0]?.text || "",
        },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "90vh",
        overflowY: "auto",
      }}
      className="bg-no-repeat bg-cover"
    >
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link to={"/home"} className="lg:hidden">
            <i className="fa-solid fa-angles-left text-2xl"></i>
          </Link>
          <div>
            <img
              src={gemni}
              alt=""
              height={80}
              width={90}
              style={{ borderRadius: "10px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = avavatar;
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              Gemni AI
            </h3>
          </div>
        </div>
      </header>
      <section className="h-[calc(100vh-128)] overflow-x-hidden overflow-y-scroll scrollbar">
        <div>
          {gemniai.map((item, index) => (
            <div
              key={index}
              style={{
                margin: "5px 0",
                color: "black",
                borderRadius: "20px",
                fontWeight: "bold",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <span
                    style={{
                      backgroundColor: "#00FF00",

                      color: "white",
                      borderBottomRightRadius: "20px",
                      padding: "8px",
                      display: "inline-block",
                      textAlign: "center",
                    }}
                  >
                    {item.message}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <span
                    style={{
                      backgroundColor: "#00FF00",
                      width:"70%",
                      color: "white",
                      paddingRight: "10px",
                      borderBottomRightRadius: "20px",
                      padding: "8px",
                      display: "inline-block",
                      textAlign: "center",
                      marginLeft:"5px"
                    }}
                  >
                    {item.reply}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        className="h-16 bg-white flex items-center px-4"
        style={{ position: "fixed", bottom: "0", width: "100%" }}
      >
        <form className="h-full w-full flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type here message..."
            className="py-1 px-4 outline-none w-full h-full"
            name="message"
            value={message}
            onChange={handleOnChange}
          />
          <button className="mt-3 text-primary hover:text-secondary responseive">
            send
          </button>
        </form>
      </section>
    </div>
  );
};

export default Gemniai;
