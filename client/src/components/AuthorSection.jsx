import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectAllUser } from "../redux/features/userSlice";

const AuthorSection = ({ id }) => {
  const { user } = useSelector(selectAllUser);

  const [author, setAuthor] = useState();

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const { data } = await axios.get(`/${id}`);
        setAuthor(data.user);
      } catch (error) {
        console.error(error.message);
      }
    };
    getAuthor();
  });

  console.log(author?.followers?.includes(user?._id) ? "following" : "follow");

  const addFollow = async () => {
    try {
      await axios.put(`/follow/${author?._id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-[30%] hidden md:block p-3 sticky left-0 top-0 ">
      <div className="bg-white  border shadow-md rounded-md ">
        <div className="bg-cyan-700 w-full h-16 rounded-sm relative flex items-center justify-start p-5">
          <img
            src={author?.avatar}
            alt=""
            className="h-14 w-14 absolute bottom-[-30px] rounded-full"
          />
        </div>

        <div className="p-5">
          <h1 className="font-extrabold mt-5  leading-4 text-lg mb-1 flex gap-1 ">
            <MdVerified className="text-sky-600" />
            {author?.name}
          </h1>
          <span className="font-bold text-gray-400 tracking-wider">
            @{author?.email?.split("@")[0]}
          </span>
        </div>
        <div className="flex gap-4 items-center justify-center mt-5 ">
          <h1>
            <span className="font-extrabold">{author?.followers?.length}</span>{" "}
            followers
          </h1>{" "}
          <h1>|</h1>
          <h1>
            <span className="font-extrabold">{author?.following?.length}</span>{" "}
            following
          </h1>{" "}
        </div>

        <div className="p-5">
          <div
            className={
              author?.followers?.includes(user?._id)
                ? "cursor-pointer bg-gradient-to-bl from-gray-900 to-gray-600  px-4 py-2 rounded-md  text-white text-center"
                : "cursor-pointer bg-gradient-to-r from-sky-400 to-blue-500 px-4 py-2 rounded-md  text-white text-center"
            }
            onClick={addFollow}
          >
            {author?.followers?.includes(user?._id) ? "Following" : "Follow"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSection;
