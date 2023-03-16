import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUser } from "../redux/features/userSlice";
import { selectAllPost } from "../redux/features/postSlice";
import Post from "./Post";
import UserCard from "./UserCard";

const TabComponent = () => {
  const { post, user } = useSelector(selectAllUser);
  const { posts } = useSelector(selectAllPost);

  const savedPost = [];

  console.log(savedPost);

  const [toggleState, setToggleState] = useState(1);

  console.log(toggleState);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="flex flex-col h-full font-poppins w-full  ">
      <div className=" flex items-center justify-center  w-full ">
        <div className="flex text-black gap-x-2 sm:gap-x-5 px-4  ">
          <h1
            className={
              toggleState === 1
                ? "relative text-sm md:text-xl text-sky-600 scale-90 hover:cursor-pointer font-bold"
                : "relative text-sm md:text-xl hover:cursor-pointer"
            }
            onClick={() => toggleTab(1)}
          >
            Posts
          </h1>
          |
          <h1
            className={
              toggleState === 2
                ? "relative text-sm md:text-xl text-sky-600 scale-90 hover:cursor-pointer font-bold"
                : "relative text-sm md:text-xl hover:cursor-pointer"
            }
            onClick={() => toggleTab(2)}
          >
            Save
          </h1>
          |
          <h1
            className={
              toggleState === 3
                ? "relative text-sm md:text-xl text-sky-600 scale-90 hover:cursor-pointer font-bold "
                : "relative text-sm md:text-xl hover:cursor-pointer"
            }
            onClick={() => toggleTab(3)}
          >
            Followers
          </h1>
          |
          <h1
            className={
              toggleState === 4
                ? "relative text-sm md:text-xl text-sky-600 scale-90 hover:cursor-pointer font-bold "
                : "relative text-sm md:text-xl hover:cursor-pointer"
            }
            onClick={() => toggleTab(4)}
          >
            Following
          </h1>
        </div>
      </div>

      <div className="flex justify-center    p-10  ">
        <div className="flex justify-center      ">
          <div
            className={
              toggleState === 1
                ? "toggle_show  gap-10 gap-x-10  grid w-full lg:grid-cols-3 md:grid-cols-3 sm:grid-rows-3 grid-cols-1  justify-items-center"
                : "hidden"
            }
          >
            {post.map((item) => (
              <Post post={item} />
            ))}
          </div>

          <div
            className={
              toggleState === 2
                ? "toggle_show  gap-10 gap-x-10  grid w-full lg:grid-cols-3 md:grid-cols-3 sm:grid-rows-3 grid-cols-1  justify-items-center"
                : "hidden"
            }
          >
            {post.map((item) => (
              <Post post={item} />
            ))}
          </div>

          <div
            className={
              toggleState === 3
                ? "toggle_show  gap-10 gap-x-10  grid w-full lg:grid-cols-3 md:grid-cols-3 sm:grid-rows-3 grid-cols-1  justify-items-center"
                : "hidden"
            }
          >
            {user?.followers?.map((item) => (
              <UserCard id={item} />
            ))}
          </div>
          <div
            className={
              toggleState === 4
                ? "toggle_show  gap-10 gap-x-10  grid w-full lg:grid-cols-3 md:grid-cols-3 sm:grid-rows-3 grid-cols-1  justify-items-center"
                : "hidden"
            }
          >
            {user?.following?.map((item) => (
              <UserCard id={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
