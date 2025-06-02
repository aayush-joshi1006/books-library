import React from "react";

export default function HomePage() {
  return (
    <div className="flex min-h-[45vh] justify-center items-center flex-col">
      <div className="h-1/2">
        <h1>Welcome to BookHaven</h1>
        <p>
          favorite reads all in one place. Whether you’re a fiction lover or a
          sci-fi enthusiast, we’ve got something for every reader. Discover,
          explore, and organize your
        </p>
      </div>
      <div className="h-[45vh]">
        <div>
          <div>Browse by Category</div>
          <div>
            <span>fiction</span>
            <span>fiction</span>
            <span>fiction</span>
            <span>fiction</span>
          </div>
        </div>
        <div>
          <div>Popular books</div>
          <div>Book 1</div>
          <div>Book 2</div>
          <div>Book 3</div>
          <div>Book 4</div>
        </div>
      </div>
    </div>
  );
}
