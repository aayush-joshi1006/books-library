import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Book from "./Book";
import { useParams, useNavigate, Link } from "react-router";
import CategoryDropdown from "./CategoriesDropdown";

export default function BrowseBooks() {
  const books = useSelector((store) => store.booksList.books);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let tempBooks = books;
    if (category) {
      tempBooks = books.filter(
        (book) => book.category.toLowerCase().trim() === category.toLowerCase()
      );
    }

    if (search.trim() !== "") {
      tempBooks = tempBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase().trim()) ||
          book.author.toLowerCase().includes(search.toLowerCase().trim())
      );
    }
    setFilteredBooks(tempBooks);
  }, [search, books, category]);

  const categories = useMemo(() => {
    return books.reduce((acc, cur) => {
      let tempCat = cur.category.toLowerCase().trim();
      if (!acc.includes(tempCat)) {
        acc.push(cur.category.toLowerCase().trim());
      }
      return acc;
    }, []);
  }, [books]);

  return (
    <div className="lg:min-h-[90vh] w-full ">
      <div className="text-center py-4 flex justify-center lg:gap-10 gap-3 items-center flex-col lg:flex-row">
        <input
          type="text"
          placeholder="Search book by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none px-5 py-2 my-1 bg-[#f5f7f8] text-gray-800 min-w-8/12 lg:min-w-[50vw] rounded-2xl"
        />
        <div className="flex justify-center items-center gap-3">
          <span>Categories:</span>
          <CategoryDropdown categories={categories} />
        </div>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-col-1  place-items-center lg:container lg:mx-auto my-10 gap-8">
        {filteredBooks.length == 0 && <div>No books found</div>}
        {filteredBooks.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
