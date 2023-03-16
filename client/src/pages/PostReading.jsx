import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  commentPost,
  fetchPost,
  getPostStatus,
  selectAllPost,
} from "../redux/features/postSlice";
import Heart from "../assets/heart.png";
import Comment from "../assets/comment.png";

import Loading from "../components/Loading";
import { toast } from "react-hot-toast";
import axios from "axios";
import { MdOutlineSummarize } from "react-icons/md";
import { selectAllUser } from "../redux/features/userSlice";
import AuthorSection from "../components/AuthorSection";
import { summarize } from "../util/request/summarization";
import Processing from "../components/Processing";

const PostReading = () => {
  const dispatch = useDispatch();

  // const { posts } = useSelector(selectAllPost);

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [sloading, setSloading] = useState(false);

  const { id } = useParams();

  const [post, setPost] = useState();
  const [summarizedText, setSummrizedText] = useState("");
  // console.log(post);
  useEffect(() => {
    setLoading(true);
    const getSinglePost = async () => {
      try {
        const { data } = await axios.get(`/post/${id}`);
        // console.log(data);
        setPost(data.post);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getSinglePost();
  }, []);

  // console.log(buttonName);

  const onCommentSubmit = (e) => {
    dispatch(
      commentPost({
        comment,
        id: post?._id,
      })
    );
    window.location.reload();
    toast.success("Commented!");
  };

  const handleSummarizer = async () => {
    setSloading(true);
    summarize({
      inputs: post?.content,
    }).then((response) => {
      setSummrizedText(JSON.stringify(response[0].summary_text));

      setSloading(false);
    });
  };

  if (sloading == true) {
    return (
      <div>
        <Processing />
      </div>
    );
  }

  if (loading == true) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-[#FFFBF5] h-full flex font-poppins">
      <div className="flex  w-full p-3">
        <div className="md:w-[10%] hidden h p-5 md:flex flex-col items-end gap-5 mt-20  ">
          <div className="flex justify-center  flex-col">
            <img src={Heart} alt="" className="h-7 w-7" />
            <span>{post?.likes?.length}</span>
          </div>
          <div className="flex justify-center flex-col">
            <img src={Comment} alt="" className="h-7 w-7" />
            <span>{post?.comments?.length}</span>
          </div>
        </div>
        <div className="md:w-[60%] w-full shadow-lg rounded-md p-3 bg-white">
          <img
            src={post?.image}
            alt=""
            className="w-full h-80 object-fill rounded-md"
          />
          <div className="sm:p-10 p-3 ">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12  ">
                  <img
                    src={post?.avatar}
                    alt="Avatar"
                    className="rounded-full h-12 w-12"
                  />
                </div>
                <div className="flex flex-col text-base">
                  <span className="font-extrabold">{post?.name}</span>
                  <span className="font-light">
                    {post?.createdAt.split("T")[0]}
                  </span>
                </div>
              </div>
              <div
                className={
                  summarizedText != ""
                    ? "  disabled: hover:scale-105 transition duration-300 ease-in-out cursor-pointer bg-gradient-to-r from-gray-900 to-gray-600  text-xs sm:text-base  px-1 sm:px-3 py-2 rounded-sm sm:rounded-xl  text-white flex items-center gap-1 "
                    : "hover:scale-105 transition duration-300 ease-in-out cursor-pointer bg-gradient-to-r from-sky-400 to-blue-500 text-xs sm:text-base  px-1 sm:px-3 py-2 rounded-md sm:rounded-xl  text-white flex items-center gap-1 "
                }
                onClick={handleSummarizer}
              >
                <MdOutlineSummarize />
                {summarizedText != "" ? "Summarized" : "Summarize"}
              </div>
            </div>
            <h1
              className="font-extrabold  sm:text-2xl mt-10
      "
            >
              {post?.title}
            </h1>
            <h1 className="font-extrabold mt-3 text-sky-600">
              #{post?.category}
            </h1>

            {summarizedText != "" ? (
              <h1 className="text-green-700 mt-6">
                | Content reduced by{" "}
                {Math.floor(
                  (summarizedText.length / post?.content.length) * 100
                )}
                %
              </h1>
            ) : (
              ""
            )}
            <div className="mt-4 text-sm sm:text-lg tracking-wide first-letter:text-4xl font-light mb-10">
              {summarizedText != "" ? summarizedText : post?.content}
            </div>
            <hr />
            <div className="mt-5 p-5 bg-white shadow-md">
              <h1 className="font-extrabold">Comments</h1>
              <form action="submit" onSubmit={onCommentSubmit}>
                <textarea
                  id="message"
                  rows="4"
                  onChange={(e) => setComment(e.target.value)}
                  className=" mt-2 block p-2.5 w-full text-sm  bg-white rounded-lg border border-gray-300 focus:outline-none"
                  placeholder="Leave a comment..."
                ></textarea>
              </form>
              <div
                className="  w-24 mt-5 cursor-pointer bg-gradient-to-r from-sky-400 to-blue-500 px-4 py-2 rounded-md  text-white"
                onClick={onCommentSubmit}
              >
                Submit
              </div>

              {post?.comments.map((rev) => (
                <div className="flex items-start mt-5 gap-2 p-3">
                  <div className="sm:h-12 sm:w-12  h-10 w-10 ">
                    <img
                      src={rev.avatar}
                      alt="Avatar"
                      className="rounded-full h-full w-full"
                    />
                  </div>
                  <div className="border text-xs sm:text-base p-4 rounded-lg  w-full ">
                    <h1>{rev.name}</h1>
                    <p className="font-light text-gray-600 mt-3">
                      {rev.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <AuthorSection id={post?.author} />
      </div>
    </div>
  );
};

export default PostReading;
