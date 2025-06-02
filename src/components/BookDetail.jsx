import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdStar } from "react-icons/md";

export default function BookDetail() {
  let { id } = useParams();

  const books = useSelector((store) => store.booksList.books);

  let currentBook = books.filter((book) => book.id === id)[0];

  return (
    <div className="min-h-[90vh] relative flex justify-center items-center">
      <button className="absolute top-2 left-2 flex justify-center items-center hover:underline text-blue-600 hover:text-blue-500">
        <MdArrowBackIosNew />
        <Link to="/books">Back</Link>
      </button>
      <div className="w-96 flex justify-center items-center flex-col gap-3 p-3 shadow-lg rounded-lg hover:shadow-xl">
        <div>
          <img
            src={currentBook.coverImage}
            alt={`${currentBook.title} by ${currentBook.author}`}
            className=" h-96 w-80 mt-2 rounded-lg"
          />
        </div>
        <div className="flex justify-center items-center flex-col w-80">
          <h2 className="font-extrabold text-2xl">{currentBook.title}</h2>
          <p className="text-base italic text-gray-400 font-extralight">
            {currentBook.author}
          </p>
          <p className="text-sm text-center font-extralight">
            {currentBook.description}
          </p>
          <div className="flex justify-between items-center w-full mx-2 my-2 ">
            <p className="px-2 py-1 rounded-2xl bg-[#017bb6] text-[#feffff] font-extralight text-sm shadow-sm hover:bg-[#017ab6e0] cursor-pointer">
              {currentBook.category}
            </p>
            <div className="flex justify-center items-center cursor-pointer hover:bg-gray-300 px-2 py-1 rounded-2xl">
              <MdStar className="text-orange-500" />{" "}
              <p>{currentBook.rating}/5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
