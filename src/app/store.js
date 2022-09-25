import { configureStore } from "@reduxjs/toolkit";
import BookSliceReducer from "../feature/BookSlice.js";

export const store = configureStore({
  reducer: {
    book: BookSliceReducer,
  },
});
