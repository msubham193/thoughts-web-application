import React from "react";
import Lottie from "react-lottie";
import Process from "../assets/processing.json";

const Processing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Process,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className=" h-screen flex flex-col gap-8 justify-center items-center font-poppins   sm:tracking-widest text-sm sm:text-xl ">
      <div className="h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] ">
        <Lottie options={defaultOptions} />
      </div>
      Wait.. For intelligent summarization !
    </div>
  );
};

export default Processing;
