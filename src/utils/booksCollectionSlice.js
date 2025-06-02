import { createSlice } from "@reduxjs/toolkit";
import { books } from "./booksCollection";

const booksSlice = createSlice({
  name: "booksList",
  initialState: {
    books: JSON.parse(localStorage.getItem("booksCollection")) || books,
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
  },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;
