import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import SearchUser from "./SearchUser";
import Avatar from "./Avatar";
function Sidebar() {
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const user = useSelector((state) => state.user);
  const [edituser, setEdituser] = useState(false);
  return (
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
            <i className="fa-regular fa-message text-2xl"></i>
          </NavLink>
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
            title="user"
            onClick={() => setOpenSearchUser(true)}
          >
            <i className="fa-solid fa-user-plus text-2xl"></i>
          </div>
        </div>
        <div>
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
            title="User"
          >
            <button onClick={() => setEdituser(true)}>
      
            <Avatar/>
            </button>
          </div>
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
            title="logout"
          >
            <i className="fa-solid fa-right-from-bracket text-2xl"></i>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {/* {allUser.length === 0 ? (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <i className="fa-solid fa-arrow-pointer text-2xl"></i>
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation with.
              </p>
            </div>
          ) : (
            // all close friend 
          )} */}
        </div>
      </div>

      {edituser && (
        <EditUserDetails onClose={() => setEdituser(false)} data={user} />
      )}
      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
}

export default Sidebar;
