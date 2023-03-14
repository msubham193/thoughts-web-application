import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookMark from "../assets/bookmark.png";
import BookMarked from "../assets/bookmarked.png";
import HeartFill from "../assets/heartFill.png";
import Heart from "../assets/heart.png";
import { bookMarkPost, likePost } from "../redux/features/postSlice";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { selectAllUser } from "../redux/features/userSlice";

const Post = ({ post }) => {
  const [like, setLike] = useState(post?.likes?.length);
  const user = useSelector((state) => state.user.user);

  const [LikeIcon, setLikeIcon] = useState([
    post.likes.includes(user?._id) ? HeartFill : Heart,
  ]);

  console.log(post);

  const [bookmarkIcon, setBookmarkIcon] = useState([
    post.bookmark.includes(user?._id) ? BookMarked : BookMark,
  ]);

  const dispatch = useDispatch();

  const style = {
    borderRadius: "10px",
    background: "#001946",
    color: "#fff",
  };

  const onLiked = () => {
    if (!user) {
      toast("Please login to continue !", {
        icon: "🚫",
        style,
      });
      return;
    }
    if (LikeIcon == Heart) {
      setLikeIcon(HeartFill);
      setLike(like + 1);
      try {
        dispatch(likePost(post._id));
      } catch (error) {
        console.log(error.message);
      }

      toast("Liked !", {
        icon: "👍",
        style,
      });
    } else {
      setLikeIcon(Heart);
      setLike(like - 1);

      dispatch(likePost(post._id));
      toast("Disliked !", {
        icon: "👎",
        style,
      });
    }
  };

  const onBookmark = () => {
    if (!user) {
      toast("Please login to continue !", {
        icon: "🚫",
        style,
      });
      return;
    }

    if (bookmarkIcon == BookMarked) {
      setBookmarkIcon(BookMark);
      dispatch(bookMarkPost(post._id));
      toast.error("UnSaved !", { style });
    } else {
      setBookmarkIcon(BookMarked);
      dispatch(bookMarkPost(post._id));
      toast.success("Saved !", { style });
    }
  };

  console.log(post?.author);

  return (
    <div className="shadow-xl sm:w-[300px] md:w-[350px] p-4 rounded-2xl hover:scale-105 transition duration-500  bg-slate-50 flex flex-col items-center justify-center font-poppins gap  text-sm ">
      <Link className="" to={`/post/${post._id}`}>
        <img src={post.image} alt="" className=" h-[200px] w-full rounded-xl" />

        <h1 className="text-left mt-3 first-letter:text-xl  mb-2 flex justify-between   ">
          <h1 className="bg-amber-100 p-1"> {post.category}</h1>

          {user?._id == post?.author ? (
            <Link to={`/create/${post._id}`}>
              <FiEdit className="h-4 w-4" />
            </Link>
          ) : null}
        </h1>
        <h1 className="font-extrabold text-left text-sm md:text-base mb-3">
          {post.title}
        </h1>
        <p className="text-gray-600  text-sm text-left">
          {post.content.slice(0, 100)}
        </p>
      </Link>

      <div className="flex items-center gap-10 mt-5 w-full">
        <div className="flex items-center gap-3 w-full bg-sky-100 rounded-xl">
          <div className=" md:h-12 md:w-12  w-10  h-10">
            <img
              src={post?.avatar}
              alt="Avatar"
              className="rounded-full h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col text-xs md:text-base">
            <span>{post?.name}</span>
            <span>{post?.createdAt.split("T")[0]}</span>
          </div>
        </div>
        <div className="flex items-center justify-center text-sm  gap-3 ">
          <div className="flex items-center justify-center gap-2 p-2">
            <img
              src={LikeIcon}
              alt=""
              className="h-6 w-6 cursor-pointer"
              onClick={onLiked}
            />
            <h1>{like}</h1>
          </div>
          <img
            src={bookmarkIcon}
            alt=""
            className="h-6 w-6 cursor-pointer"
            onClick={onBookmark}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
