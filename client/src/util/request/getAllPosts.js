import axios from "axios";

export const getAllPosts = async (keyword) => {
  const { data } = await axios.get(
    `/post/all?keyword=${keyword ? keyword : ""}`
  );

  return data.posts;
};
