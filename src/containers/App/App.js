import React, { useState, useEffect } from "react";
import * as BooksAPI from "../../BooksAPI";
import { BookShelf, Search } from "../../components";
import { Route } from "react-router-dom";
import "./App.css";

export const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  const handleChange = (book, event) => {
    let e = event.target.value;
    BooksAPI.update(book, e).then((res) => {
      book.shelf = e;
      updateBooks();
    });
  };

  const updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  };

  return (
    <div className="app">
      <Route
        exact
        path="/"
        render={() => <BookShelf myBooks={books} handleChange={handleChange} />}
      />
      <Route
        exact
        path="/search"
        render={() => <Search myBooks={books} handleChange={handleChange} />}
      />
    </div>
  );
};
