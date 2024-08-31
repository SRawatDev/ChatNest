import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Backendapi } from "../apis/api";
import callAPI from "../apiUtils/apiCall";
import UserSearchCard from "./UserSearchCard";
import Toaster from "../Toaster/Toaster";

const SearchUser = ({ onClose }) => {
  const [message, setMessage] = useState({
    status: "",
    message: "",
    key: 0,
  });
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({ search: "" });

  const allActiveUser = async (searchParam = "") => {
    try {
      setLoading(true);
      const responseData = await callAPI(
        Backendapi.allactiveUserList,
        { search: searchParam },
        "get",
        null,
        true
      );
      setLoading(false);
      setSearchUser(responseData?.data);
      console.log("Fetched user data:", responseData.data);
    } catch (error) {
      setLoading(false);
      setMessage({
        status: false,
        message: error.message,
        key: Date.now(),
      });
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      allActiveUser(search.search);
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [search.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  return (
    <>
      <Toaster
        message={message.message}
        status={message.status}
        key={message.key}
      />
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-10">
        <div className="w-full max-w-lg mx-auto mt-10 relative">
          <div className="bg-white rounded h-14 overflow-hidden flex">
            <input
              type="text"
              value={search.search}
              onChange={handleChange}
              name="search"
              placeholder="Search user by name, email..."
              className="w-full outline-none py-1 h-full px-4"
            />
            <div className="h-14 w-14 flex justify-center items-center">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <div
            className="bg-white mt-2 w-full p-4 rounded"
            style={{ height: "442px", overflowY: "auto" }}
          >
            {/* no user found */}
            {searchUser.length === 0 && !loading && (
              <p className="text-center text-slate-500">No user found!</p>
            )}

            {loading && (
              <div>
                <Loading />
              </div>
            )}

            {searchUser.length !== 0 &&
              !loading &&
              searchUser.map((user, index) => (
                <UserSearchCard key={user._id} user={user} onClose={onClose} />
              ))}
          </div>
        </div>
        <div
          className="absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white cursor-pointer"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </>
  );
};

export default SearchUser;
