import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdStar } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";

//componet showing the full details of the book selected
export default function BookDetail() {
  // getting id from the url of the book to be seleceted 
  let { id } = useParams();

  // accessing the books from the redux store 
  const books = useSelector((store) => store.booksList.books);

  // filteringout the current book by matching the id
  let currentBook = books.filter((book) => book.id === id)[0];

  // in case no book if found show the error page
  if (!currentBook) {
    return (
      <div className="min-h-[90vh] flex justify-center items-center flex-col gap-4">
        <p className="text-xl text-red-500">Book not found 😢</p>
        {/* Link baack to the browse section */}
        <Link to="/books" className="ml-4 underline text-blue-600">
          Go Back
        </Link>
      </div>
    );
  }

  // componet in case the id do gets matched
  return (
    <div className="min-h-[90vh] relative flex justify-center items-center ">
      {/* link for going back to the browse section */}
      <Link
        to="/books"
        className="absolute top-2 left-2 flex justify-center items-center hover:underline text-blue-600 hover:text-blue-500"
      >
        <MdArrowBackIosNew />
        Back
      </Link>

      <div className="w-full max-w-sm md:max-w-md flex justify-center items-center flex-col gap-3 p-3 shadow-lg rounded-lg hover:shadow-xl">
        <div>
          {/* cover image component */}
          <img
            src={currentBook.coverImage}
            onError={(e) =>
              // function to proive alternative photo in case the photo fails to load
              (e.target.src = "./assets/placeholder.jpg")
            }
            alt={`${currentBook.title} by ${currentBook.author}`}
            className=" h-96 w-80 mt-2 rounded-lg"
          />
        </div>
        {/* componen showing the details of the book  */}
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
            {/* Visual display of stars according to the rating  */}
            {/* <div className="flex items-center gap-1">
              {Array(Math.floor(currentBook.rating))
                .fill()
                .map((_, i) => (
                  <MdStar key={i} className="text-orange-500" />
                ))}
              {Array(5 - Math.floor(currentBook.rating))
                .fill()
                .map((_, i) => (
                  <FaRegStar key={i} className="" />
                ))}
              <p className="text-sm ml-1">{currentBook.rating}/5</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
