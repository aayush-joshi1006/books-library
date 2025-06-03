import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksCollectionSlice";

// Store to store all the redux variables
const appStore = configureStore({
  reducer: {
    // reducer to store the collection of books
    booksList: booksReducer,
  },
});

export default appStore;
