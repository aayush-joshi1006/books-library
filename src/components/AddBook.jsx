import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";
import { addBook } from "../utils/booksCollectionSlice";

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
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            placeholder="Book's Title"
            value={bookObj.title}
            onChange={(e) =>
              setBookObj((obj) => ({ ...obj, title: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="author">Author*</label>
          <input
            type="text"
            id="author"
            placeholder="Author's Title"
            value={bookObj.author}
            onChange={(e) =>
              setBookObj((obj) => ({ ...obj, author: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="coverImage">Cover Image*</label>
          <input
            type="url"
            id="coverImage"
            placeholder="Cover Image"
            value={bookObj.coverImage}
            onChange={(e) =>
              setBookObj((obj) => ({ ...obj, coverImage: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            step="0.01"
            min="0"
            max="5"
            placeholder="Rate out of 5"
            value={bookObj.rating}
            onChange={(e) =>
              setBookObj((obj) => ({
                ...obj,
                rating: parseFloat(e.target.value),
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="category">Category*</label>
          <input
            type="text"
            id="category"
            placeholder="Category"
            value={bookObj.category}
            onChange={(e) =>
              setBookObj((obj) => ({ ...obj, category: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="give a brief description about the book"
            value={bookObj.description}
            onChange={(e) =>
              setBookObj((obj) => ({ ...obj, description: e.target.value }))
            }
          />
        </div>
        <div>
          <button type="submit">Add Book</button>
        </div>
      </form>
      <div>{bookObj.title}</div>
    </>
  );
}
