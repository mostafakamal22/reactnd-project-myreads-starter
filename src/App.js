import React from 'react';
import BooksShelf from './BooksShelf';
import SearchPage from './searchPage';
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import { Link } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    currentlyReading :[],
    wantToRead:[],
    read:[],
  }
  //invokes getbooks method when the app renders
  componentDidMount(){
    this.getbooks();
  }
  //get myStored books in the backend server 
  getbooks = async ()=> {
    const data = await BooksAPI.getAll();
    const res = JSON.stringify(data);
    const allBooks = JSON.parse(res);
    const readBooks = allBooks.filter(book => book.shelf === "read")
    const wantToReadBooks = allBooks.filter(book => book.shelf === "wantToRead")
    const currentlyReadingBooks = allBooks.filter(book => book.shelf === "currentlyReading")
    this.setState({
      currentlyReading: currentlyReadingBooks,
      wantToRead:wantToReadBooks,
      read:readBooks
    })
  }

  //update my books' shelves in the backend
  updateBookShelf = async (bookId,shelf)=> {
    await BooksAPI.update(bookId,shelf);
    this.getbooks()
}

  render() {
    return (
      <div className="app">
        <Route exact path="/myReads/search" >
          <SearchPage data={this.state} update={this.updateBookShelf} />
        </Route>
        <Route exact path="/myReads" render= {()=> (
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
                  books={this.state.currentlyReading}
                  defaultValue="currentlyReading" 
                  update={ this.updateBookShelf} 
                  />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <BooksShelf 
                  books={this.state.wantToRead}
                  defaultValue="wantToRead" 
                  update={ this.updateBookShelf} 
                  />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <BooksShelf 
                  books={this.state.read}
                  defaultValue="read" 
                  update={ this.updateBookShelf} 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link className="open-search-button" to="/myReads/search" >Add a book</Link>
          </div>
        </div>
        )}/>
    </div>
    )
  }
}

export default BooksApp
