import React, { useState, useEffect } from "react";
import { SearchPage } from "./components/SearchPage";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";

export const App = () => {
  const [booksData, setBooksData] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: [],
  });

  //invokes getbooks method when the app first mount
  useEffect(() => {
    getbooks();
  }, []);

  //get myStored books from the backend server
  const getbooks = async () => {
    const data = await BooksAPI.getAll();
    const res = JSON.stringify(data);
    const allBooks = JSON.parse(res);
    const readBooks = allBooks.filter((book) => book.shelf === "read");
    const wantToReadBooks = allBooks.filter(
      (book) => book.shelf === "wantToRead"
    );
    const currentlyReadingBooks = allBooks.filter(
      (book) => book.shelf === "currentlyReading"
    );
    setBooksData({
      currentlyReading: currentlyReadingBooks,
      wantToRead: wantToReadBooks,
      read: readBooks,
    });
  };

  //update my books' shelves in the backend
  const updateBookShelf = async (bookId, shelf) => {
    await BooksAPI.update(bookId, shelf);
    getbooks();
  };

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/myReads/search"
            element={
              <SearchPage
                booksData={booksData}
                updateBookShelf={updateBookShelf}
              />
            }
          ></Route>

          <Route
            path="/myReads"
            element={
              <Home booksData={booksData} updateBookShelf={updateBookShelf} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};
