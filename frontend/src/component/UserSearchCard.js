import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import avavatar from "../assests/avavatar.avif";
import { useSelector } from "react-redux";
import { baseUrl } from "../config/config";

const UserSearchCard = ({ user, onClose }) => {
  const OnlineUser = useSelector((state) => state?.user)?.onlineUser;
  const isOnline = OnlineUser.includes(user?._id);
  return (
    <Link
      to={"/home/" + user?._id}
      onClick={onClose}
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer"
    >
      <div>
        <img
          src={`${baseUrl.productionUrl}/images/${user.profile_pic}`}
          alt=""
          height={50}
          width={50}
          style={{
            borderRadius: "50%",
            height: "50px",
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
    </Link>
  );
};

export default UserSearchCard;
