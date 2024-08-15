import React from "react";
import logo from "../assests/logo.png"

function AuthLayout({ children }) {
  return (
    <>
      <header className="flex justify-center items-center py-3 h-20 shadow-md bg-white">
        <img src={logo} alt="image not found" width={180} height={60} />
      </header>
      {children}
    </>
  );
}

export default AuthLayout;
