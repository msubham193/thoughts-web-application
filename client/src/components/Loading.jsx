import React from "react";
import Lottie from "react-lottie";
import LoadingAnime from "../assets/loading.json";
const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnime,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default Loading;
