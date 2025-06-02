import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksCollectionSlice";

const appStore = configureStore({
  reducer: {
    booksList: booksReducer,
  },
});

export default appStore;
