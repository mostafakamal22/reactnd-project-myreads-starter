import React, { Component } from 'react'
import BooksShelf from './BooksShelf'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

export default class SearchPage extends Component {
  state={
    query:"",
    searchedBooks:[]
  }
  //handling search query change
  handleChange = async(query)=> {
    this.setState({
      query:query
    })
    const searchedBooks = await BooksAPI.search(query);
    this.setState({
      searchedBooks:searchedBooks
    })
  }
  //matching the shelves of both (search and home pages) by comparing the Ids of books 
  matchingShelves = (bookSearchResult)=> {
    const allbooks=[
      ...this.props.data.read,
      ...this.props.data.currentlyReading,
      ...this.props.data.wantToRead
    ]
    const bookId = bookSearchResult.id
    const findBook =allbooks.find(b=> b.id===bookId)
    if(findBook!==undefined){
      bookSearchResult.shelf= findBook.shelf
      return findBook.shelf
    }
    else{
      return "none"
    }
  }
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/myReads" className="close-search"  >Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  value={this.state.query} 
                  onChange={(event)=> this.handleChange(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              {
              (typeof this.state.searchedBooks === "undefined" || this.state.searchedBooks.error === "empty query")? 
               (<div>
                 {this.state.query !== ""  ? <div className="not-found" >Book Or Auther Not Found</div> : <div></div>} 
                </div>
                )
               :(this.state.searchedBooks.length !== 0  && this.state.query!==""?
                  (
                    <BooksShelf 
                    books={this.state.searchedBooks}
                    defaultValue={this.matchingShelves} 
                    update={this.props.update} 
                    /> 
                  ):(
                      <div></div>
                    )
                  )
                }   
            </div>
          </div>
        )
    }
}
