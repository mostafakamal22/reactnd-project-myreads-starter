import React from 'react'

export default function BooksShelf(props) {
    return (
        <ol className="books-grid">
                {props.books.map((book)=>(
                        <li  key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks!==undefined ?book.imageLinks.thumbnail:""})` }}></div>
                                    <div className="book-shelf-changer">
                                    <select 
                                    defaultValue={(typeof props.defaultValue ==="function")? (props.defaultValue(book)) : (props.defaultValue)} 
                                    onChange={(event)=> props.update({id:book.id}, event.target.value)} 
                                    >
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read" >Read</option>
                                        <option value="none" >None</option>
                                    </select>
                                    </div>
                                </div>
                            <div className="book-title"> {book.title} </div>
                            <div className="book-authors">
                                { Array.isArray(book.authors)===true 
                                ?book.authors.join(",\n")
                                :book.authors
                                }
                            </div>
                            </div>
                        </li>
                    ))
                }   
             </ol>
    )
}

