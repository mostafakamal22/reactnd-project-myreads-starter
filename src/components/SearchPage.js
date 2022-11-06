import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import { BooksShelf } from "./BooksShelf";

export const SearchPage = ({ updateBookShelf, booksData }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchedBooks, setSearchedBooks] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      //handling search query change
      const getBooks = async () => {
        const searchedBooks = await BooksAPI.search(searchQuery);

        setSearchedBooks(searchedBooks);
      };
      getBooks();
    }
  }, [searchQuery]);

  //matching the shelves of both (search and home pages) by comparing the Ids of books
  const matchingShelves = (bookSearchResult) => {
    const allbooks = [
      ...booksData.read,
      ...booksData.currentlyReading,
      ...booksData.wantToRead,
    ];
    const bookId = bookSearchResult.id;
    const findBook = allbooks.find((b) => b.id === bookId);
    if (findBook) {
      bookSearchResult.shelf = findBook.shelf;
      return findBook.shelf;
    } else {
      return "none";
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/myReads" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        {typeof !searchedBooks === "undefined" ||
        searchedBooks.error === "empty query" ? (
          <div>
            {searchQuery !== "" ? (
              <div className="not-found">Book Or Auther Not Found</div>
            ) : (
              <div></div>
            )}
          </div>
        ) : searchedBooks.length !== 0 && searchQuery !== "" ? (
          <BooksShelf
            books={searchedBooks}
            defaultValue={matchingShelves}
            updateBookShelf={updateBookShelf}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
