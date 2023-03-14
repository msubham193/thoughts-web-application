import React from "react";
import { useSelector } from "react-redux";
import { selectAllUser } from "../redux/features/userSlice";
import { MdVerified } from "react-icons/md";

import TabComponent from "../components/TabComponent";

const Profile = () => {
  const data = useSelector(selectAllUser);

  const user = data.user;

  const posts = data.post;

  const te = user?.email.split("@")[0];
  return (
    <div className="bg-[#FFFBF5] h-full font-poppins flex flex-col items-center">
      <div
        style={{
          backgroundImage: `url(https://cdn.pixabay.com/photo/2017/08/15/08/23/stars-2643089_1280.jpg)`,
        }}
        className="w-full h-56 bg-slate-300 relative flex items-center justify-center"
      >
        <div className="absolute bottom-[-50px]">
          <img
            src={user?.avatar}
            alt=""
            className="h-32 w-32 object-cover rounded-3xl relative  shadow-lg  border-4 border-sky-600"
          />
        </div>
      </div>
      <h1 className="font-extrabold mt-20 leading-4 text-lg mb-2 flex gap-1">
        <MdVerified className="text-sky-600" />
        {user?.name}
      </h1>
      <span className="font-bold text-gray-400 tracking-wider">{`@${te}`}</span>
      <div className="flex gap-4 items-center justify-center mt-5 ">
        <h1>
          <span className="font-extrabold">{data.post.length}</span> post
        </h1>{" "}
        <h1>
          <span className="font-extrabold">{user?.followers.length}</span>{" "}
          followers
        </h1>{" "}
        <h1>
          <span className="font-extrabold">{user?.following.length}</span>{" "}
          following
        </h1>{" "}
      </div>
      <p className="font-thin text-gray-500 tracking-wide text-center p-5 w-[40%]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam,
        voluptas officia! Quae sunt fugit laboriosam, eveniet soluta fugiat.
        Consequuntur, alias.
      </p>

      <div className=" ">
        <TabComponent posts={posts} />
      </div>
    </div>
  );
};

export default Profile;
