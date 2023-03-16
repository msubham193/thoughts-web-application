import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./features/postSlice";
import titlesReducer from "./features/titlesSlice";
import userReducer from "./features/userSlice";
import { applyMiddleware, compose } from "redux";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = configureStore(
  {
    reducer: {
      user: userReducer,
      posts: postReducer,
      titles: titlesReducer,
    },
  },
  composeEnhancers(applyMiddleware())
);
