import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/UserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
