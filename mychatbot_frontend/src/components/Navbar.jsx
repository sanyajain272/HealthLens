import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-36 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />

      {/* Menu */}
      <ul className="hidden md:flex items-start gap-6 font-medium">

        <NavLink to="/">
          <li className="py-1">HOME</li>
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
        </NavLink>

      </ul>

      {/* Profile */}
      <div className="flex items-center gap-4">

        {token ? (

          <div className="flex items-center gap-2 cursor-pointer group relative">

            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="Profile"
            />

            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="Dropdown"
            />

            <div className="absolute right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block">

              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">

                <p
                  onClick={() => navigate("/profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>

                <p
                  onClick={() => navigate("/appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>

                <p
                  onClick={() => setToken(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>

              </div>

            </div>

          </div>

        ) : (

          <button
            onClick={() => navigate("/login")}
            className="bg-[#5F6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer"
          >
            Create Account
          </button>

        )}

      </div>

    </div>
  );
};

export default Navbar;