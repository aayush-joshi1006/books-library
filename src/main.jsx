import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./components/HomePage.jsx";
import BrowseBooks from "./components/BrowseBooks.jsx";
import BookDetail from "./components/BookDetail.jsx";
import AddBook from "./components/AddBook.jsx";
import Error from "./components/Error.jsx";

// object for creating browser routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/books",
        element: <BrowseBooks />,
      },
      {
        path: "/books/:category",
        element: <BrowseBooks />,
      },
      {
        path: "/book/:id",
        element: <BookDetail />,
      },
      {
        path: "/add",
        element: <AddBook />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* providing router object as a parameter to access routes */}
    <RouterProvider router={router} />
  </StrictMode>
);
