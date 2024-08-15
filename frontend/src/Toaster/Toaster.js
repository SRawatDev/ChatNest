import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Toaster.css'; // Make sure to import your CSS file

function Toaster({ message, status, key }) {
  useEffect(() => {
    if (message) {
      const toastClass = status === true ? "toast-success" : "toast-error";
      toast(message, {
        className: toastClass,
        autoClose: 3000, // Optional: automatically close after 3 seconds
      });
    }
  }, [message, status, key]);

  return <ToastContainer />;
}

export default Toaster;
