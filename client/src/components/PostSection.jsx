import React, { useEffect, useState } from "react";
import { getAllPosts } from "../util/request/getAllPosts";
import BigPost from "./BigPost";
import CategoryBar from "./CategoryBar";
import Post from "./Post";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchPost,
  getPostError,
  getPostStatus,
  selectAllPost,
} from "../redux/features/postSlice";
import Loading from "./Loading";
import Empty from "./empty";

const PostSection = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => ({ ...state.posts }));
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  if (posts.length === 0) {
    return (
      <div className="h-[70%] text-center flex justify-center font-poppins items-center text-xl">
        <h1>No post available</h1>
      </div>
    );
  }

  let x = Math.floor(Math.random() * posts.length + 1);

  return (
    <div className=" mt-10 bg-[#FFFBF5]  ">
      <div className="w-full flex justify-center">
        <CategoryBar />
      </div>

      {}

      <div className="hidden md:flex">
        {" "}
        <BigPost post={posts[x - 1]} className="bg-red-400" />
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3  mt-3">
        {postStatus == "succseed"
          ? posts?.map((post) => <Post post={post} />)
          : null}
      </div>
    </div>
  );
};

export default PostSection;
