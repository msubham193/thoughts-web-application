import React, { useState } from "react";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Banner from "../assets/banner.jpg";
import { fetchPost } from "../redux/features/postSlice";
import { selectAllTitles } from "../redux/features/titlesSlice";

const Hero = () => {
  const [name, setName] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);

  const titles = useSelector(selectAllTitles);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const wordEntered = e.target.value.trim();
    setName(wordEntered);
    const filter = titles.filter((value) => {
      return value.title.toLowerCase().includes(wordEntered.toLowerCase());
    });

    setFilteredPost([]);
    if (filter.length > 0) {
      setFilteredPost(filter);
    } else {
    }

    if (wordEntered.length === 0) {
      setFilteredPost([]);
    }
  };

  const onSearchSubmit = () => {
    dispatch(fetchPost(name));
  };

  return (
    <div className="py-2 ">
      <div
        style={{ backgroundImage: `url(${Banner})` }}
        className="bg-cover h-[150px] md:h-[200px] flex justify-center relative  text-center items-center rounded-xl md:rounded-3xl "
      >
        <h1 className="font-shantell text-white font-extrabold  lg:text-4xl tracking-wider ">
          .....Thoughts.....
        </h1>
        <div className="absolute    flex flex-col">
          {" "}
          <div className="max-w-md w-[300px] lg:w-[600px] bg-slate-400  mx-auto rounded-lg overflow-hidden md:max-w-xl realtive shadow-xl">
            <div className="absolute  w-full mt-12 md:mt-16 ">
              <div className="w-full">
                <div className="relative">
                  <div className=" absolute top-4 lg:top-6 left-5 z-50  ">
                    <FaSearch />
                  </div>
                  <form onSubmit={onSearchSubmit}>
                    <input
                      type="text"
                      className="bg-white h-12 lg:h-16 shadow-md relative w-full px-12 rounded-2xl focus:outline-none hover:cursor-pointer"
                      name=""
                      onChange={handleOnChange}
                      placeholder="Search "
                    />
                  </form>

                  
                </div>
              </div>{" "}
              {filteredPost.length > 0 ? (
                <div className="searchList  font-poppins  text-right bg-white  shadow-lg transition  ease-linear rounded-lg ">
                  {filteredPost.slice(0, 10).map((post) => (
                    <Link
                      className="searchItem flex text-left text-xs md:text-base hover:bg-slate-300 p-1 px-3 border-b-[0.5px] border-black "
                      to={`/post/${post.id}`}
                    >
                      {post.title}
                    </Link>
                  ))}

                  <span className="text-gray-500  text-xs">
                    By Subham Mishra
                  </span>
                </div>
              ) : null}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
