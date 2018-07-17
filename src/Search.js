import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Search extends Component {
    state = {
        query: ''
    }
    
    updateQuery = (query) => {
        this.setState({ query })
    }
    
    clearQuery = () => {
        this.setState({query: ''})
    }
    
    render() {
        const { query } = this.state
        const { books } = this.props
        let searchBooks, error;
        if (query){
            const match = new RegExp(escapeRegExp(query), 'i')
            searchBooks = books.filter((book) => match.test(book.title) || match.test(book.authors))
            if (searchBooks.length == 0){
                error = 'Sorry, no results found. Please try a different search term';
            }
        } else {
            searchBooks = [];
        }
        searchBooks.sort(sortBy('title'))
        
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                type="text" 
                placeholder="Search by title or author" 
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
             <ol className="books-grid">
            {!error && searchBooks.map((book) => (
                        <li key={book.id} className='books-grid'>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + `${book.imageLinks.smallThumbnail}` + ")" }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                        </li>
            ))}
            {error &&
                <li>
                    {error}
                </li>
            }
             </ol>
            </div>
          </div> 
        )
    }
}

export default Search