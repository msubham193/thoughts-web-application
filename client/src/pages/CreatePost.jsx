import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createPost, updatePost } from "../redux/features/postSlice";

const CreatePost = () => {
  const [postImg, setPostImg] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return;
    }
    const getSinglePost = async () => {
      try {
        const { data } = await axios.get(`/post/${id}`);
        // console.log(data);
        setPostImg(data.post.image);
        setTitle(data.post.title);
        setContent(data.post.content);
        setCategory(data.post.category);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSinglePost();
  }, [id]);

  const handlePostImg = (e) => {
    const file = e.target.files[0];

    transferFile(file);
  };

  const transferFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPostImg(reader.result);
      };
    } else {
      setPostImg("");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    try {
      if (id) {
        try {
          dispatch(
            updatePost({ title, content, category, image: postImg, id })
          );
        } catch (e) {
          console.log(e);
        }

        toast.success("Updated Sucessfully !");
      } else {
        dispatch(createPost({ title, content, category, image: postImg }));
        toast.success("Created Sucessfully !");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="py-12 flex justify-center font-poppins  bg-[#FFFBF5]">
      <Toaster />
      <form
        action=""
        onSubmit={handleOnSubmit}
        className="md:w-[50%] w-[80%] p-5 h-full  shadow-2xl bg-white rounded-2xl "
      >
        <div className="text-xl font-bold text-sky-700 text-center  tracking-wide ">
         {id?"Update Post !":"Create  Post !"} 
        </div>
        <div className="mt-5">
          <div className="text-base font-bold text-gray-700  tracking-wide ">
            Title of the post
          </div>
          <input
            className="w-full mt-3 text-base p-3 rounded-md   border border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-500"
            type=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title..."
          />
        </div>

        <div className="mt-5">
          <div className="text-base font-bold text-gray-700 tracking-wide">
            Content of the post
          </div>
          <textarea
            className="w-full mt-3 text-base p-3 rounded-md   border border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-500"
            type=""
            rows={7}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the content..."
          />
        </div>
        <div className="mt-5">
          <div className="text-base font-bold text-gray-700 tracking-wide">
            Select category
          </div>

          <select
            data-te-select-init
            className=" tracking-wider mt-3 w-52 rounded-md px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">select</option>
            <option value="education">education</option>
            <option value="technology">technology</option>
            <option value="politics">politics</option>
            <option value="sports">sports</option>
            <option value="science">science</option>
          </select>
        </div>
        <div className="mt-5">
          <div className="text-base font-bold text-gray-700 tracking-wide">
            Select post thumbnail
          </div>
          <div class=" w-full items-center mt-3  gap-3 bg-grey-lighter ">
            <label class="w-64 flex flex-col  items-center px-4 py-3 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue-300 cursor-pointer hover:bg-blue">
              <svg
                class="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-1 text-sm font-poppins leading-normal">
                Select a image
              </span>
              <input
                type="file"
                class="hidden"
                accept="image/"
                onChange={handlePostImg}
              />
            </label>
          </div>
          <div className="w-full h-32 bg-gray-100 mt-3  ">
            <img
              src={postImg}
              alt=""
              className="h-full w-full object-cover rounded-lg "
            />
          </div>
          <button
            className="bg-gradient-to-r from-sky-400 to-blue-500 text-gray-100 p-4 w-60 mt-5 rounded-lg tracking-wide
                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                shadow-lg"
            onClick={handleOnSubmit}
          >
            {id ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
