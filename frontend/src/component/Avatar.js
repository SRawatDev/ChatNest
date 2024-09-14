import React from "react";
import avavatar from "../assests/avavatar.avif";
import { baseUrl } from "../config/config";
function Avatar() {
  return (
    <div>
      <img
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = avavatar;
        }}
      
        src={`${baseUrl.productionUrl}/images/${localStorage.getItem("profileImage")}`}
        alt="Profile"
        style={{width:"40px",height:"40px",borderRadius:"50%"}}
      />
    </div>
  );
}

export default React.memo(Avatar);
