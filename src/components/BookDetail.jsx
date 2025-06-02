import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router";

export default function BookDetail() {
  let { id } = useParams();

  const books = useSelector((store) => store.booksList.books);

  let currentBook = books.filter((book) => book.id === id)[0];

  return (
    <div>
      {currentBook.title}
      <button>
        <Link to="/books">Back to browsing</Link>
      </button>
    </div>
  );
}
