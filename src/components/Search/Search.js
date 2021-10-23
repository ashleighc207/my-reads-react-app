import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOptions } from "../Book/BookOptions.js";
import * as BooksAPI from "../../BooksAPI";

export const Search = ({ handleChange, myBooks }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  const updateBooks = (books) => {
    const currentBooks = books.map((book) => {
      book.shelf = "none";
      myBooks.forEach((myBook) => {
        if (book.id === myBook.id) {
          book.shelf = myBook.shelf;
        }
      });
      if (!book.imageLinks) {
        book.imageLinks = {
          thumbnail:
            "https://cohenwoodworking.com/wp-content/uploads/2016/09/300x500.gif",
        };
      }
      return book;
    });
    setResults(currentBooks);
  };

  useEffect(() => {
    if (query) {
      setError(false);
      setResults([]);
      BooksAPI.search(query).then((books) => {
        if (books.length > 0) {
          updateBooks(books);
        } else {
          setError(true);
        }
      });
    } else {
      setError(false);
      setResults([]);
    }
  }, [query]);

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {!query && <li>To search for a new book, type in your keyword</li>}
          {!error &&
            results.map((book) => (
              <li key={book.id} className="books-grid">
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                      }}
                    ></div>
                    <BookOptions book={book} handleChange={handleChange} />
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          {error && (
            <li>Sorry, no results found. Please try a different search term</li>
          )}
        </ol>
      </div>
    </div>
  );
};
