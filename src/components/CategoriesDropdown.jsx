import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoryDropdown({ categories }) {
  // state for the condition of the dropdown is open or not
  const [open, setOpen] = useState(false);
  // method for navigating to diffrent urls
  const navigate = useNavigate();
  // getting category from the url
  const { category } = useParams();
  // creating a reference for the dropdown button
  const dropdownRef = useRef();

  // function for handling the navigation to the link of the category
  const handleSelect = (cat) => {
    // closing the dropdown
    setOpen(false);
    // navigating to the link
    navigate(cat === "" ? "/books" : `/books/${cat}`);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      // closing the dropdown if current reference is clicked or outside the reference
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    // on mousedown the event gets executed
    document.addEventListener("mousedown", handleClickOutside);

    // remving the event listener after execution
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // Category dropdown component
    <div className="relative w-40" ref={dropdownRef}>
      <button
        // function for setting the current condition of dropdown to reverse
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-white border border-gray-300 px-4 py-2 rounded shadow text-left"
      >
        {/* none condition on the dropdown button */}
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "None"}
      </button>
      {/* rendering all the categories if the dropdown is opened */}
      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-48 overflow-y-auto">
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect("")}
          >
            None
          </li>
          {/* rendering all categories using map and sorting them */}
          {categories
            .sort((a, b) => a.localeCompare(b))
            .map((cat) => (
              <li
                key={cat}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(cat)}
              >
                {/* capitalization */}
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
