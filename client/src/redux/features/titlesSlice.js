import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  titles: [],
};

export const fetchTitles = createAsyncThunk("fetchTitles", async () => {
  try {
    const { data } = await axios.get("post/titles");
    return data.title;
  } catch (error) {
    return error.message;
  }
});

const titleSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTitles.fulfilled, (state, action) => {
      state.titles = action.payload;
    });
  },
});

export const selectAllTitles = (state) => state.titles.titles;
export default titleSlice.reducer;