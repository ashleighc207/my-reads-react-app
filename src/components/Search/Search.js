import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";

class Search extends Component {
  state = {
    query: "",
    results: [],
    error: false
  };

  search = event => {
    let query = event.target.value;

    this.setState({ query });

    if (query) {
      BooksAPI.search(query).then(books => {
        if (books.length > 0) {
          this.updateBooks(books);
        } else {
          this.setState({ error: true });
        }
      });
    } else {
      this.setState({ results: [], error: false });
    }
  };

  updateBooks(books) {
    const currentBooks = books.map(book => {
      book.shelf = "none";
      this.props.myBooks.forEach(myBook => {
        if (book.id === myBook.id) {
          book.shelf = myBook.shelf;
        }
      });
      if (!book.imageLinks) {
        book.imageLinks = {
          thumbnail:
            "https://cohenwoodworking.com/wp-content/uploads/2016/09/300x500.gif"
        };
      }
      return book;
    });

    this.setState({
      results: currentBooks
    });
  }

  render() {
    const { handleChange } = this.props;
    const { query, results, error } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.search(event)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {!query && <li>To search for a new book, type in your keyword</li>}
            {!error &&
              results.map(book => (
                <li key={book.id} className="books-grid">
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select
                          value={book.shelf}
                          onChange={event => handleChange(book, event)}
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
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
            {error && (
              <li>
                Sorry, no results found. Please try a different search term
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
