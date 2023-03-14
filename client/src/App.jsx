import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { fetchTitles } from "./redux/features/titlesSlice";
import Profile from "./pages/Profile";
import PostReading from "./pages/PostReading";
import PhotoUpload from "./pages/PhotoUpload";

import CreatePost from "./pages/CreatePost";
import { fetchPost, getPostStatus } from "./redux/features/postSlice";

axios.defaults.baseURL = "https://thoughts-backend.onrender.com/api";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const postStatus = useSelector(getPostStatus);

  // const loadUser = async () => {
  //   try {
  //     const { data } = await axios.get("/me");
  //     dispatch(userAdd(data.user));
  //   } catch (error) {
  //     // console.log(error.message);
  //     dispatch(userAdd(null));
  //   }
  // };

  useEffect(() => {
    if (postStatus == "idle") {
      dispatch(fetchPost());
    }
    dispatch(fetchTitles());
  }, [postStatus, dispatch]);

  return (
    <div>
      {" "}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<PostReading />} />
        <Route path="/user/upload" element={<PhotoUpload />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/create/:id" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
