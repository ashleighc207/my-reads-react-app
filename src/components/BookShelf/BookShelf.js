import { Link } from "react-router-dom";
import { Book } from "../Book/Book";

export const BookShelf = ({ myBooks, handleChange }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {myBooks
                  .filter((book) => book.shelf === "currentlyReading")
                  .map((book, idx) => (
                    <Book book={book} handleChange={handleChange} key={idx} />
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {myBooks
                  .filter((book) => book.shelf === "wantToRead")
                  .map((book, idx) => (
                    <Book book={book} handleChange={handleChange} key={idx} />
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {myBooks
                  .filter((book) => book.shelf === "read")
                  .map((book, idx) => (
                    <Book book={book} handleChange={handleChange} key={idx} />
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};
