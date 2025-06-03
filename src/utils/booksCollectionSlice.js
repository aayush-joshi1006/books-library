import { createSlice } from "@reduxjs/toolkit";
import { books } from "./booksCollection";

// slice of the collection of books
const booksSlice = createSlice({
  // name of the slice
  name: "booksList",
  // initial value of the array
  initialState: {
    // if the array is already not stored in the local storage access from the collection
    books: JSON.parse(localStorage.getItem("booksCollection")) || books,
  },
  reducers: {
    // method to add the book to the store
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
  },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;
