import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { HiOutlineBookmark } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import isUserExist from "../util/userExist";
import { AiOutlinePlus } from "react-icons/ai";
import userLogo from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectAllUser } from "../redux/features/userSlice";
import Logout from "../assets/logout.png";

const Navbar = () => {
  const navigate = useNavigate();

  const pageName = window.location.href.split("/")[3];

  const [menu, setIsMenu] = useState(false);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const { user } = useSelector((state) => ({ ...state.user }));

  return (
    <div className="w-full h-16 shadow-xl flex items-center p-5 md:p-10 justify-between  sticky top-0 z-50 bg-white ">
      <div className="flex gap-2" onClick={() => navigate("/")}>
        <img src={Logo} alt="" className="h-6 w-6" />
        <span className="font-extrabold font-righteous  text-lg md:text-2xl tracking-wide">
          thoughts.
        </span>
      </div>

      <div className=" relative ">
        <div className="flex items-center gap-5 top-6 right-5  cursor-pointer font-poppins">
          {user != null ? (
            <img
              src={user?.avatar}
              alt=""
              className="rounded-full h-10 w-10 object-cover"
              onClick={() => navigate("/profile")}
            />
          ) : (
            ""
          )}

          {user == null ? (
            <div className="flex items-center gap-5">
              <div
                className=" cursor-pointer text-sm md:text-base hover:scale-110  transition duration-300 ease-in-out "
                onClick={() => navigate("/user/login")}
              >
                Login
              </div>
              <div
                className=" hover:scale-110 transition duration-300 ease-in-out text-sm md:text-base cursor-pointer bg-gradient-to-r from-sky-400 to-blue-500 px-3 md:px-4 py-2 rounded-xl  text-white"
                onClick={() => navigate("/user/register")}
              >
                Sign up
              </div>
            </div>
          ) : (
            <div
              className=" hover:scale-110 transition duration-300 ease-in-out cursor-pointer bg-gradient-to-r from-sky-400 to-blue-500 px-3 py-2 rounded-xl  text-white flex items-center gap-1 "
              onClick={() => navigate("/create")}
            >
              <AiOutlinePlus />
              Create
            </div>
          )}

          {pageName == "profile" ? (
            <img
              src={Logout}
              alt="logout"
              className="h-9 w-9"
              onClick={logout}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
