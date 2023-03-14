import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  error: "null",
};

export const fetchPost = createAsyncThunk("fetchPost", async (value = "") => {
  try {
    const { data } = await axios.get(`/post/all?keyword=${value}`);

    return data.posts;
  } catch (error) {
    return error.message;
  }
});

export const createPost = createAsyncThunk("createPost", async (values) => {
  // console.log(values);
  try {
    const { data } = await axios.post("/post/create", values);
    console.log(data);
    return data.post;
  } catch (error) {
    return error.message;
  }
});

export const likePost = createAsyncThunk("likePost", async (id) => {
  try {
    console.log(id);
    const { data } = await axios.put(`post/like/${id}`);

    console.log(data);
    return data.post;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
});

export const DisLikePost = createAsyncThunk("DisLikePost", async (id) => {
  try {
    // console.log(id);
    const { data } = await axios.put(`post/dislike/${id}`);

    return data.Likedpost.likes;
  } catch (error) {
    return error.message;
  }
});

export const bookMarkPost = createAsyncThunk("bookMarkPost", async (id) => {
  try {
    await axios.put(`post/bookmark/${id}`);
  } catch (error) {
    return error.message;
  }
});

export const commentPost = createAsyncThunk("commentPost", async (comment) => {
  try {
    const { data } = await axios.put(`post/comment`, comment);
    return data.post;
  } catch (error) {
    return error.message;
  }
});

export const updatePost = createAsyncThunk("updatePost", async (value) => {

  try {
    const { data } = await axios.put(`post/update/${value.id}`, value);
    return data.post;
  } catch (error) {
    return error.message;
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succseed";
        state.posts = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(DisLikePost.fulfilled, (state, action) => {})
      .addCase(bookMarkPost.fulfilled, (state, action) => {
        console.log("Successfully Book marked !");
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succseed";
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.status = "succseed";
        state.posts.push(action.payload);
      })
      .addCase(updatePost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succseed";
        state.posts.push(action.payload);
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllPost = (state) => state.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export default postSlice.reducer;
