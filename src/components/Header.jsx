import React from "react";
import { Link } from "react-router";
import { ImBooks } from "react-icons/im";

export default function Header() {
  return (
    <div className="bg-[#017bb6] text-[#feffff]">
      <div className="min-h-[10vh] flex container mx-auto justify-around items-center">
        <Link to="/">
          <div className="flex justify-center items-center text-2xl gap-1 font-bold transition duration-700 hover:-translate-y-0.5">
            <ImBooks className="text-5xl" />
            <span>BOOKHAVEN</span>
          </div>
        </Link>

        <ul className="flex justify-center items-center gap-6">
          <li className="transition duration-700 hover:-translate-y-0.5 font-bold">
            <Link to="/">Home</Link>
          </li>
          <li className="transition duration-700 hover:-translate-y-0.5 font-bold">
            <Link to="/books">Browse</Link>
          </li>
          <li className=" bg-orange-600 transition duration-700 rounded-sm font-extralight px-3 py-2 hover:bg-orange-500">
            <Link to="/add">Add a Book</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
