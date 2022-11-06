import React from "react";

export const BooksShelf = ({ books, updateBookShelf, defaultValue }) => {
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${
                    book.imageLinks !== undefined
                      ? book.imageLinks.thumbnail
                      : ""
                  })`,
                }}
              ></div>
              <div className="book-shelf-changer">
                <select
                  defaultValue={
                    typeof defaultValue === "function"
                      ? defaultValue(book)
                      : defaultValue
                  }
                  onChange={(event) =>
                    updateBookShelf({ id: book.id }, event.target.value)
                  }
                >
                  <option value="move or add" disabled>
                    {book.shelf ? "Move to..." : "Add to..."}
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title"> {book.title} </div>
            <div className="book-authors">
              {Array.isArray(book.authors)
                ? book.authors.join(",\n")
                : book.authors}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};
