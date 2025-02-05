import React from "react";
import { Link } from "react-router-dom";
import { BooksShelf } from "./BooksShelf";

export const Home = ({ booksData, updateBookShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <BooksShelf
                books={booksData.currentlyReading}
                defaultValue="currentlyReading"
                updateBookShelf={updateBookShelf}
              />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <BooksShelf
                books={booksData.wantToRead}
                defaultValue="wantToRead"
                updateBookShelf={updateBookShelf}
              />
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <BooksShelf
                books={booksData.read}
                defaultValue="read"
                updateBookShelf={updateBookShelf}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link className="open-search-button" to="/myReads/search">
          Add a book
        </Link>
      </div>
    </div>
  );
};
