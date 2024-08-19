import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
function Sidebar() {
  const user=useSelector((state)=>state.user)
  const [edituser,setEdituser]=useState(true)

  return (
    <div className="w-full h-full">
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
            <i class="fa-regular fa-message text-2xl"></i>
          </NavLink>
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
            title="user"
          >
            <i className="fa-solid fa-user-plus text-2xl"></i>
          </div>
        </div>
        <div>
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded"
            title="User"
          >
            <button onClick={()=>setEdituser(true)}>
            <i className="fa-solid fa-user-tie text-2xl"></i>
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


      {
        edituser && (
          <EditUserDetails onClose={()=>setEdituser(false)}  data={user} />
        )
      }
    </div>
  );
}

export default Sidebar;
