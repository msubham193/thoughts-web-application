import React from "react";
import Lottie from "react-lottie";
import EmptyAnime from "../assets/empty.json";

const empty = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: EmptyAnime,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default empty;
