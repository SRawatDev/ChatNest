import React from "react";
import avavatar from "../assests/avavatar.avif";
import { useSelector } from "react-redux";

const Groupcard = ({ user, onClose, onClick }) => {
  const OnlineUser = useSelector((state) => state?.user)?.onlineUser;
  const isOnline = OnlineUser.includes(user?._id);

  return (
    <div
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer"
      onClick={onClick} // Attach the click handler here
    >
      <div>
        <img
          src={`http://localhost:8000/images/${user.profile_pic}`}
          alt=""
          height={50}
          width={50}
          style={{
            borderRadius: "50%",
            border: isOnline ? "4px solid green" : "4px solid red", // Conditional border color
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = avavatar;
          }}
        />
      </div>
      <div>
        <div className="font-semibold text-ellipsis line-clamp-1">
          {user?.name}
        </div>
        <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
      </div>
    </div>
  );
};

export default Groupcard;
