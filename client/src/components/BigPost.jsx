import React from "react";

import Heart from "../assets/heart.png";
import HeartFill from "../assets/heartFill.png";

const BigPost = ({ post }) => {
 
  return (
    <div className=" grid grid-cols-2 gap-7 font-poppins  mt-10 shadow-md  bg-slate-50 p-5 rounded-3xl">
      <img src={post?.image} alt="" className="h-[350px] w-full rounded-3xl" />

      <div>
        <span>{post?.category}</span>
        <h1 className="text-3xl font-poppins mt-5 mb-4 first-letter:text-5xl">
          {post?.title}
        </h1>
        <p className="text-gray-500">{post?.content.slice(0, 150)}</p>
        <div className="flex items-center gap-10 mt-5 ">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16  ">
              <img
                src={post?.avatar}
                alt="Avatar"
                className="rounded-full h-16 w-16"
              />
            </div>
            <div className="flex flex-col">
              <span>Subham Mishra</span>
              <span>Jun 27,2021</span>
            </div>
          </div>
          <div className="flex items-center justify-center text-base gap-5  ">
            <div className="flex items-center justify-center gap-2 p-2">
              <img src={Heart} alt="" className="h-6 w-6" />
              <span>34</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigPost;
