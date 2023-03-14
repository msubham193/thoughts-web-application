import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import Hero from "../components/Hero";
import Loading from "../components/Loading";
import PostSection from "../components/PostSection";
import {
  fetchPost,
  getPostError,
  getPostStatus,
  selectAllPost,
} from "../redux/features/postSlice";
import { selectStatus } from "../redux/features/userSlice";

const HomePage = () => {
  const status = useSelector(selectStatus);
  const postStatus = useSelector(getPostStatus);

  if (status === "pending" || postStatus === "loading") {
    return <Loading />;
  }

  return (
    <div className="relative h-screen  px-3 md:px-24 bg-[#FFFBF5]">
      <Toaster />
      <Hero />

      <PostSection />
    </div>
  );
};

export default HomePage;
