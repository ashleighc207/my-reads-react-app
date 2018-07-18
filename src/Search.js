import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Search extends Component {
    state = {
        query: '',
        results: [],
        error: ''
    }
    
    search = (event) => {
        let error = '', results = [];
        const query = event.target.value;
        
        this.setState({ query })
        
        if (query){
        BooksAPI.search(query).then((books) => {
            books.length > 0 ?  this.setState({results: books}) : this.setState({ results: [] })
        })
        if (results.length == 0){
            error = 'Sorry, no results found. Please try a different search term';
        }
    }
    }
    clearQuery = () => {
        this.setState({query: ''})
    }
    
    render() {
        const { query, results, error } = this.state
        const { books, handleChange } = this.props
        
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                type="text" 
                placeholder="Search by title or author" 
                value={query}
                onChange={this.search}
                />
              </div>
            </div>
            <div className="search-books-results">
             <ol className="books-grid">
            {!error && results.map((book) => (
                        <li key={book.id} className='books-grid'>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + `${book.imageLinks.smallThumbnail}` + ")" }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={(event) => this.props.handleChange(book, event)}>
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