import React from "react";
import avavatar from "../assests/avavatar.avif";
import './app.css'

const Groupusers = ({ close, Roomusers }) => {
  return (
    <div className="overlay"> 
      <div className="group-users-container"> 
        {Roomusers?.map((item) => (
          <div
            key={item._id} 
            className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer"
            onClick={close} 
          >
            <div>
              <img
                src={`http://localhost:8000/images/${item.profile_pic}`}
                alt=""
                height={50}
                width={50}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = avavatar;
                }}
              />
            </div>
            <div>
              <div className="font-semibold text-ellipsis line-clamp-1">
                {item?.name}
              </div>
              <p className="text-sm text-ellipsis line-clamp-1">{item?.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groupusers;
