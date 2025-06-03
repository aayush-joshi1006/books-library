import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Book from "./Book";
import { useParams } from "react-router-dom";
import CategoryDropdown from "./CategoriesDropdown";

export default function BrowseBooks() {
  // getting books collection from the store
  const books = useSelector((store) => store.booksList.books);
  // state for searched text
  const [search, setSearch] = useState("");
  // state of filtered books
  const [filteredBooks, setFilteredBooks] = useState(books);
  // getting category from the url
  const { category } = useParams();

  // for search term and category
  useEffect(() => {
    // trimming and converting to lowercase of Search
    const normalizedSearch = search.toLowerCase().trim();
    // trimming and converting to lowercase if category is present
    const normalizedCategory = category?.toLowerCase().trim();

    // spreading books collection and provide to temporary variable
    let tempBooks = [...books];
    // setting value of tempBooks if category is present
    if (category) {
      // filtering the book collcetion
      tempBooks = tempBooks.filter(
        (book) => book.category.toLowerCase().trim() === normalizedCategory
      );
    }
    // contition if anything is searched on the search bar
    if (normalizedSearch) {
      // filtering out books that matches the searched string
      tempBooks = tempBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(normalizedSearch) ||
          book.author.toLowerCase().includes(normalizedSearch)
      );
    }
    // setting the value of filtered books
    setFilteredBooks(tempBooks);
  }, [search, books, category]);

  // getting all the categories of the books present in the books collection
  // using useMemo hook so that this operation does not take place unless books collection is changed
  const categories = useMemo(() => {
    // using reduce method to get unique categories  no repeatation
    return books.reduce((acc, cur) => {
      let tempCat = cur.category.toLowerCase().trim();
      if (!acc.includes(tempCat)) {
        acc.push(cur.category.toLowerCase().trim());
      }
      return acc;
    }, []);
  }, [books]);

  return (
    // Component showing all books
    <div className="lg:min-h-[90vh] w-full ">
      {/* component for search bar and categories */}
      <div className="text-center py-4 flex justify-center lg:gap-10 gap-3 items-center flex-col lg:flex-row">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search book by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none px-5 py-2 my-1 bg-[#f5f7f8] text-gray-800 w-11/12 lg:w-[50vw] lg:min-w-[50vw] rounded-2xl"
        />
        {/* Category dropdown */}
        <div className="flex justify-center items-center gap-3">
          <span>Categories:</span>
          <CategoryDropdown categories={categories} />
        </div>
      </div>
      {/* books Collection */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4
  place-items-center lg:container lg:mx-auto my-10"
      >
        {/* checking if no books are present in filteredBooks array */}
        {filteredBooks.length === 0 ? (
          <div className="col-span-full text-center text-lg font-medium text-red-600 w-full">
            No books found
          </div>
        ) : (
          // rendering all the books in filterBooks using map method
          filteredBooks.map((book) => <Book key={book.id} book={book} />)
        )}
      </div>
    </div>
  );
}
