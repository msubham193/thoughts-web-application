import React from "react";
import { RxSpeakerLoud } from "react-icons/rx";
const SoundPlay = () => {
  return (
    <div className=" w-10 h-10 bg-blue-600 shadow-md  absolute bottom-28 left-20 rounded-xl flex items-center justify-center text-white font-extrabold cursor-pointer hover:scale-110 transition duration-200 ">
      <RxSpeakerLoud />
    </div>
  );
};

export default SoundPlay;
