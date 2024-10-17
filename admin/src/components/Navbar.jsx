import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken, getToken } from "../utils/token.js";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate("/login");
    toast.success("Successfuly logout");
  };

  return (
    <div className="px-[2vw] flex justify-between items-center gap-4 pb-2 relative z-[1000] font-normal w-full">
      <Link to={"/"} className="w-max relative">
        <img
          src={assets.logo}
          alt="PrimeBazar"
          className="min-w-[7rem] max-w-[7rem]"
        />
        <p className="absolute -bottom-3 text-xs -right-[10%]">Admin Panel</p>
      </Link>

      {getToken() ? (
        <button
          className="bg-[#212121ef] font-normal text-white px-4 py-1 rounded-3xl text-base"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
