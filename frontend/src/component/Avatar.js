import React from "react";
import avavatar from "../assests/avavatar.avif";
function Avatar() {
  return (
    <div>
      <img
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = avavatar;
        }}
      
        src={`http://localhost:8000/images/${localStorage.getItem("profileImage")}`}
        alt="Profile"
        style={{width:"50px",height:"50px",borderRadius:"50%"}}
      />
    </div>
  );
}

export default React.memo(Avatar);
