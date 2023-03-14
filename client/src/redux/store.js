import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/postSlice";
import titlesReducer from "./features/titlesSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    titles: titlesReducer,
  },

});
