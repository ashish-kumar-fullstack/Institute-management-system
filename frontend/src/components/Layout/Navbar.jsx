import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const [isProfileModal, setIsProfileModal] = useState(false);
  const {user, isAithenticated, isAuthLoading, logout} = useAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout();
    navigate('/login')

  };

  return (
    <nav className="sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-gray-200 px-4 shadow-md">
      <button
        type="button"
        onClick={onMenuClick}
        className="cursor-pointer"
      >
        <GiHamburgerMenu className="h-7 w-7" />
      </button>

      <div className="md:hidden">
        <h1 className="text-xl font-bold">
          Its<span className="text-red-500">Manage</span>
        </h1>
      </div>

      <input
        type="text"
        placeholder="Search here..."
        className="hidden h-9 w-64 rounded-md border border-gray-300 px-4 outline-none md:block"
      />

      <div className="flex items-center gap-4">
        <div className="relative">
          <IoIosNotifications className="h-7 w-7 cursor-pointer text-red-700" />

          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs text-white">
            12
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsProfileModal((previous) => !previous)
          }
        >
          <AiOutlineUser className="h-7 w-7 cursor-pointer" />
        </button>

        {isProfileModal && (
          <div className="absolute right-4 top-16 z-50 w-64 rounded-lg bg-white p-4 shadow-lg">
            <button
              type="button"
              onClick={() => setIsProfileModal(false)}
              className="absolute right-2 top-2 text-2xl text-red-700"
            >
              <IoMdCloseCircleOutline />
            </button>

            <h2 className="mb-4 text-center text-xl font-semibold">
              Profile
            </h2>

            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">
              {user.email}
            </p>
            <p className="text-sm text-gray-600">{user.role}</p>

            <button
              type="button"
              className="mt-4 w-full rounded-lg bg-red-500 p-2 font-semibold text-white hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;