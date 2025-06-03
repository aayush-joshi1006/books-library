import { Link } from "react-router-dom";
import { MdStar } from "react-icons/md";

export default function Book({ book }) {
  // book componet for books need to be displayed in the browse tab
  return (
    <div className=" rounded-sm shadow-lg p-5 w-80 flex flex-col justify-center items-center transition duration-700 hover:-translate-y-1 hover:shadow-2xl">
      {/* book cover image */}
      <img
        src={book.coverImage}
        onError={(e) =>
          // function to proive alternative photo in case the photo fails to load
          (e.target.src = "./assets/placeholder.jpg")
        }
        alt={`${book.title} by ${book.author}`}
        className="w-64 h-80 rounded-sm object-cover"
      />
      {/* section for the title ,author and rating of the book */}
      <article className="w-full">
        <h2 className="text-lg text-center mt-2 font-bold">{book.title}</h2>
        <p className="text-base italic text-center text-gray-600 font-extralight">
          {book.author}
        </p>
        <div className="flex justify-between items-center w-64 mx-2 mt-2">
          {/* Link for going to the details page of the book */}
          <Link
            to={`/book/${book.id}`}
            className="px-2 py-1 font-extralight bg-[#017bb6] text-[#feffff] hover:bg-[#017ab6e0] transition duration-300 rounded-sm"
          >
            View Details
          </Link>
          {/* rating of the book */}
          <p className="flex justify-center items-center">
            <MdStar className="text-orange-400" /> <span>{book.rating}/5</span>
          </p>
        </div>
      </article>
    </div>
  );
}
