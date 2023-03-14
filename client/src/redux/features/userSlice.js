import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  post: [],
  status: "idle",
  error: "null",
};

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  try {
    const { data } = await axios.get("/me");

    return { user: data.user, post: data.post };
  } catch (error) {
    return error.message;
  }
});

export const logoutUser = createAsyncThunk("logoutUser", async () => {
  try {
    await axios.get("/logout");
  } catch (error) {
    return error.message;
  }
});

export const addFollow = createAsyncThunk("addFollow", async () => {
  try {
    await axios.put("/followers");
  } catch (error) {
    return error.message;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAdd: (state, action) => {
      state.user = action.payload.user;
      state.post = action.payload.post;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "fulfilled";

        action.payload == "Request failed with status code 401"
          ? ((state.user = null), (state.error = action.payload))
          : ((state.user = action.payload.user),
            (state.post = action.payload.post));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = null;
        state.post = [];
        state.error = null;
      })
      .addCase(addFollow.fulfilled, (state, action) => {});
  },
});

export const selectAllUser = (state) => state.user;
export const selectStatus = (state) => state.user.status;

export const { userAdd } = userSlice.actions;

export default userSlice.reducer;
