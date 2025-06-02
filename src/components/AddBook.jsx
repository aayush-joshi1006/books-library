import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, Link } from "react-router";
import { addBook } from "../utils/booksCollectionSlice";
import { MdArrowBackIosNew } from "react-icons/md";

export default function AddBook() {
  let navigate = useNavigate();
  let books = useSelector((store) => store.booksList.books);

  useEffect(() => {
    localStorage.setItem("booksCollection", JSON.stringify(books));
  }, [books]);
  const [bookObj, setBookObj] = useState({
    title: "",
    author: "",
    description: "",
    rating: 0,
    category: "",
    coverImage: "",
  });

  let dispatch = useDispatch();

  function submitForm(e) {
    e.preventDefault();

    const { title, author, category, coverImage } = bookObj;

    if (!title || !author || !category || !coverImage) {
      alert("Please fill in all the required fields");
      return;
    }

    let alreadyExists = books.some(
      (book) => book.title.trim().toLowerCase() === title.toLowerCase().trim()
    );

    if (alreadyExists) {
      alert("Book already exists in the Collection");
      return;
    }

    const newBook = { ...bookObj, id: uuidv4() };
    dispatch(addBook(newBook));

    alert("Book Added to the Collection");
    setBookObj({
      title: "",
      author: "",
      description: "",
      rating: 0,
      category: "",
      coverImage: "",
    });

    navigate("/books");
  }

  return (
    <>
      <div className="min-h-[90vh] flex justify-center items-center relative">
        <button className="absolute top-2 left-2 flex justify-center items-center hover:underline text-blue-600 hover:text-blue-500">
          <MdArrowBackIosNew />
          <Link to="/books">Browse</Link>
        </button>
        <form
          onSubmit={submitForm}
          className="min-w-[40vw] flex justify-center items-center gap-2 flex-col p-6 shadow-2xl"
        >
          <div className="flex justify-center items-start flex-col w-full">
            <label htmlFor="title" className="text-xs font-extralight">
              Title*
            </label>
            <input
              type="text"
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-400"
              id="title"
              placeholder="Book's Title (required)"
              value={bookObj.title}
              onChange={(e) =>
                setBookObj((obj) => ({ ...obj, title: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-center items-start flex-col w-full">
            <label className="text-xs font-extralight" htmlFor="author">
              Author*
            </label>
            <input
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-400"
              type="text"
              id="author"
              placeholder="Author's Title (required)"
              value={bookObj.author}
              onChange={(e) =>
                setBookObj((obj) => ({ ...obj, author: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-center items-start flex-col w-full">
            <label className="text-xs font-extralight" htmlFor="coverImage">
              Cover Image (url)*
            </label>
            <input
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-400"
              type="url"
              id="coverImage"
              placeholder="Book's Cover Image (required)"
              value={bookObj.coverImage}
              onChange={(e) =>
                setBookObj((obj) => ({ ...obj, coverImage: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-center items-start flex-col w-full">
            <label className="text-xs font-extralight" htmlFor="rating">
              Rating
            </label>
            <input
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-400"
              type="number"
              id="rating"
              step="0.01"
              min="0"
              max="5"
              placeholder="0-5"
              value={bookObj.rating}
              onChange={(e) =>
                setBookObj((obj) => ({
                  ...obj,
                  rating: parseFloat(e.target.value),
                }))
              }
            />
          </div>
          <div className="flex justify-center items-start flex-col w-full">
            <label className="text-xs font-extralight" htmlFor="category">
              Category*
            </label>
            <input
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-400"
              type="text"
              id="category"
              placeholder="Category (required)"
              value={bookObj.category}
              onChange={(e) =>
                setBookObj((obj) => ({ ...obj, category: e.target.value }))
              }
            />
          </div>
          <div className="flex justify-center items-start flex-col w-full">
            <label className="text-xs font-extralight" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-400"
              type="text"
              id="description"
              placeholder="Description (500 characters)"
              maxLength={500}
              rows={4}
              value={bookObj.description}
              onChange={(e) =>
                setBookObj((obj) => ({ ...obj, description: e.target.value }))
              }
            />
          </div>
          <div className="w-full">
            <button
              className="my-3 py-2 rounded-sm font-extralight bg-orange-600 w-full text-white hover:bg-orange-500 transition duration-500"
              type="submit"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
