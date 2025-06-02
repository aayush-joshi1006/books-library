import { Link } from "react-router-dom";
import { ImBooks } from "react-icons/im";

export default function Header() {
  return (
    <div className="bg-[#017bb6] text-[#feffff] py-2">
      <div className="lg:min-h-[10vh] flex lg:container lg:mx-auto justify-around items-center gap-2">
        <Link to="/">
          <div className="flex justify-center items-center lg:text-2xl gap-1 font-bold transition duration-700 hover:-translate-y-0.5">
            <ImBooks className="lg:text-5xl" />
            <span>BOOKHAVEN</span>
          </div>
        </Link>

        <ul className="flex justify-center items-center lg:gap-6 gap-3">
          <li className="transition duration-700 hover:-translate-y-0.5 font-bold">
            <Link to="/">Home</Link>
          </li>
          <li className="transition duration-700 hover:-translate-y-0.5 font-bold">
            <Link to="/books">Browse</Link>
          </li>
          <li className=" bg-orange-600 transition duration-700 rounded-sm font-extralight lg:px-3 lg:py-2 py-1 px-2 hover:bg-orange-500">
            <Link to="/add">Add a Book</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
