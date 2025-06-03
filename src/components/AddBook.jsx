import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, Link } from "react-router";
import { addBook } from "../utils/booksCollectionSlice";
import { MdArrowBackIosNew } from "react-icons/md";

export default function AddBook() {
  // creating navigation object for navigating to links
  let navigate = useNavigate();
  // importing book list from the redux store
  let books = useSelector((store) => store.booksList.books);

  // state mamagement for the book object containing book details
  const [bookObj, setBookObj] = useState({
    title: "",
    author: "",
    description: "",
    rating: "",
    category: "",
    coverImage: "",
  });

  // method for calling in function from redux store
  let dispatch = useDispatch();

  //useEffect hook used for setting changes made in book collection
  useEffect(() => {
    // set books data onto local storage
    localStorage.setItem("booksCollection", JSON.stringify(books));
  }, [books]);

  // function for validating and submitting book data to be added to the books collection
  function submitForm(e) {
    // method to prevent default behavior of form submittion
    e.preventDefault();

    // extracting book object data for validation
    const { title, author, category, coverImage, rating, description } =
      bookObj;

    // validation if required fields are not filled
    if (
      !title ||
      !author ||
      !category ||
      !coverImage ||
      !rating ||
      !description
    ) {
      alert("Please fill in all the required fields");
      return;
    }

    // checking if the book already exists on the collection
    let alreadyExists = books.some(
      (book) => book.title.trim().toLowerCase() === title.toLowerCase().trim()
    );

    // providing error messge is case of book already existing
    if (alreadyExists) {
      alert("Book already exists in the Collection");
      return;
    }

    // trimming away extra white spaces in the fields
    const trimmedBookObj = {
      ...bookObj,
      title: bookObj.title.trim(),
      author: bookObj.author.trim(),
      category: bookObj.category.trim(),
      coverImage: bookObj.coverImage.trim(),
    };

    // added unique id to book using uuid library for identification
    const newBook = { ...trimmedBookObj, id: uuidv4() };

    // dispatching the book object to the redux store for storing the book in the books collection
    dispatch(addBook(newBook));

    // message showing book is added to the collection
    alert("Book Added to the Collection");

    // emptying all filled fields to empty
    setBookObj({
      title: "",
      author: "",
      description: "",
      rating: "",
      category: "",
      coverImage: "",
    });

    // re-directng to the browse page
    navigate("/books");
  }

  return (
    <>
      <div className="min-h-[90vh] flex justify-center items-center relative">
        {/* Link directing to the browse page */}
        <Link
          to="/books"
          className="absolute top-2 left-2 flex justify-center items-center hover:underline text-blue-600 hover:text-blue-500"
        >
          <MdArrowBackIosNew />
          Browse
        </Link>
        {/* form for handling the book submittion */}
        <form
          onSubmit={submitForm}
          className="w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] flex justify-center items-center gap-2 flex-col p-6 shadow-2xl"
        >
          {/*book's title component required field */}
          <div className="flex justify-center items-start flex-col w-full">
            <label htmlFor="title" className="text-xs font-extralight">
              Title*
            </label>
            <input
              type="text"
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-900"
              id="title"
              placeholder="Book's Title (required)"
              value={bookObj.title}
              onChange={(e) =>
                setBookObj((obj) => ({ ...obj, title: e.target.value }))
              }
            />
          </div>
          {/* book's author name component (required field) */}
          <div className="flex justify-center items-start flex-col w-full">
            <label className="text-xs font-extralight" htmlFor="author">
              Author*
            </label>
            <input
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-900"
              type="text"
              id="author"
              placeholder="Author's Title (required)"
              value={bookObj.author}
              onChange={(e) =>
                setBookObj((obj) => ({ ...obj, author: e.target.value }))
              }
            />
          </div>
          {/* Cover Image component, accepts url (required component) */}
          <div className="flex justify-center items-start flex-col w-full">
            <label className="text-xs font-extralight" htmlFor="coverImage">
              Cover Image (url)*
            </label>
            <input
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-900"
              type="url"
              id="coverImage"
              placeholder="Book's Cover Image (required)"
              value={bookObj.coverImage}
              onChange={(e) =>
                setBookObj((obj) => ({ ...obj, coverImage: e.target.value }))
              }
            />
          </div>

          {/* rating component value btw 0-5 (required field) */}
          <div className="flex justify-center items-start flex-col w-full">
            <label className="text-xs font-extralight" htmlFor="rating">
              Rating*
            </label>
            <input
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-900"
              type="number"
              id="rating"
              step="0.01"
              min="0"
              max="5"
              placeholder="0-5 (required)"
              value={bookObj.rating}
              onChange={(e) =>
                //function for coverting String to FLoat value
                setBookObj((obj) => ({
                  ...obj,
                  rating: parseFloat(e.target.value),
                }))
              }
            />
          </div>
          {/* Component for setting the Category of the book (reqiured) */}
          <div className="flex justify-center items-start flex-col w-full">
            <label className="text-xs font-extralight" htmlFor="category">
              Category*
            </label>
            <input
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-900"
              type="text"
              id="category"
              placeholder="Category (required)"
              value={bookObj.category}
              onChange={(e) =>
                setBookObj((obj) => ({ ...obj, category: e.target.value }))
              }
            />
          </div>
          {/* Componet for the description of the book with max 500 characters (required) */}
          <div className="flex justify-center items-start flex-col w-full">
            <label className="text-xs font-extralight" htmlFor="description">
              Description*
            </label>
            <textarea
              className="w-full outline-none bg-gray-100 px-5 py-2 rounded-sm text-gray-900"
              type="text"
              id="description"
              placeholder="Description (required)"
              maxLength={500}
              rows={4}
              value={bookObj.description}
              onChange={(e) =>
                setBookObj((obj) => ({ ...obj, description: e.target.value }))
              }
            />
            {/* parashaph showing the number of characters used out of 500 */}
            <p className="text-xs text-gray-400">
              {bookObj.description.length}/500 characters
            </p>
          </div>
          {/* Button componet for submitting the form data of the book */}
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
