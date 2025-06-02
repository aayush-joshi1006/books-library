import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export default function CategoryDropdown({ categories }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();
  const dropdownRef = useRef();

  const handleSelect = (cat) => {
    setOpen(false);
    navigate(cat === "" ? "/books" : `/books/${cat}`);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-40" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-white border border-gray-300 px-4 py-2 rounded shadow text-left"
      >
        {category
          ? category.charAt(0).toUpperCase() + category.slice(1)
          : "None"}
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow max-h-48 overflow-y-auto">
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect("")}
          >
            None
          </li>
          {categories.map((cat) => (
            <li
              key={cat}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
