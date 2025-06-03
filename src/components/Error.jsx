import { Link } from "react-router-dom";

export default function Error() {
  // Component in case wrong url is entered
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <p className="text-6xl">Error 404: Page not Found</p>
      {/* Link taking back to the homepage */}
      <Link
        to="/"
        className="my-4 text-blue-600 hover:text-blue-500 hover:underline"
      >
        Back to Home Page
      </Link>
    </div>
  );
}
