import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdStar } from "react-icons/md";

export default function HomePage() {
  // accessing the books collection from the redux store
  let books = useSelector((store) => store.booksList.books);
  // state for the current popular books
  const [popularBooks, setPopularBooks] = useState([]);
  // state for the current popular categories
  const [popularCategories, setPopularCategories] = useState([]);

  // accessing highly rated books in case the books collection changes
  useEffect(() => {
    // sorting popular books based on the rating
    let highlyRated = [...books].sort(
      (book1, book2) => book2.rating - book1.rating
    );

    // accessing top three books
    let newPopBooks = highlyRated.slice(0, 3);
    // accessing top six categories
    let popularCat = highlyRated
      .reduce((acc, cur) => {
        let tempCat = cur.category.toLowerCase().trim();
        if (!acc.includes(tempCat)) {
          acc.push(tempCat);
        }
        return acc;
      }, [])
      .slice(0, 6);

    // setting up popular books and popular categories
    setPopularCategories(popularCat);
    setPopularBooks(newPopBooks);
  }, [books]);

  return (
    // Componet for the Home page of the books library
    <>
      <div className="min-h-[90vh] relative">
        {/* background image */}
        <div className="bg-[url(./assets/bookbgImage.jpg)] bg-cover bg-center brightness-50 min-h-[90vh] absolute top-0 left-0 w-full h-full -z-10"></div>
        {/* introduction section of the web application */}
        <div className="flex min-h-[90vh]  justify-center items-center text-white container mx-auto  relative z-10 flex-col xl:flex-row">
          <div className="flex flex-col justify-center  items-center xl:w-[40vw] p-3">
            <h1 className="xl:text-8xl text-5xl my-3 text-center xl:text-left animate-bounce">
              Welcome to BookHaven
            </h1>
            <p className="text-xl  text-center xl:text-left">
              Your favorite reads all in one place. Whether you’re a fiction
              lover or a sci-fi enthusiast, we’ve got something for every
              reader. Discover, explore, and organize your
            </p>
          </div>
          {/* Section showing popular categories and popular books */}
          <div className=" backdrop-blur-sm rounded-xl xl:mx-10 mx-5 xl:p-6 p-2 my-3">
            <div className="flex justify-center xl:items-start items-center flex-col gap-3">
              <div className="font-extralight">Popular Categories:</div>
              <div className="flex justify-center items-center gap-2 text-base font-extralight flex-wrap xl:max-w-full">
                {/* rendering popular categories */}
                {popularCategories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 rounded-2xl bg-blue-500 hover:bg-blue-400"
                  >
                    <Link to={`/books/${category}`}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Link>
                  </span>
                ))}
                <span className="px-2 py-1 hover:text-gray-300 ">
                  <Link to="/books/">+ More</Link>
                </span>
              </div>
            </div>
            {/* popular books */}
            <div className="flex justify-center xl:items-start items-center flex-col gap-3 text-xl font-extralight my-3">
              <div className="justify-between flex items-center w-full">
                <span>Popular books</span>
                <span className="px-2 py-1 bg-orange-600 rounded-2xl hover:bg-orange-500  font-extralight text-sm">
                  <Link to="/books/">View More</Link>
                </span>
              </div>
              <div className="flex justify-center items-center gap-6 lg:flex-row flex-col lg:flex-wrap 2xl:flex-nowrap">
                {/* rendering popular books */}
                {popularBooks.map((book) => (
                  <div
                    key={book.id}
                    className="xl:w-60 xl:h-96 bg-gray-500 flex justify-center items-center flex-col p-5 rounded-xl transition duration-500 hover:-translate-y-0.5"
                  >
                    <img
                      src={book.coverImage || ".assets/placeholder.jpg"}
                      alt={`${book.title} by ${book.author}`}
                      className="w-56 h-64 rounded-xl"
                    />
                    <div className="text-sm w-full">
                      <div className="justify-between flex items-center flex-col">
                        <p className="mt-2 text-base text-center">
                          {book.title}
                        </p>
                        <p className="italic font-extralight text-gray-300">
                          by {book.author}
                        </p>
                      </div>
                      <div className="justify-between flex items-center my-2 w-10/12 mx-2">
                        <p className="hover:underline">
                          <Link to={`/book/${book.id}`}>view details</Link>
                        </p>
                        <div className="flex justify-center items-center">
                          <MdStar className="text-orange-500" />
                          <span>{book.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
