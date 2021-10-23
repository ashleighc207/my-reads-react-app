import { BookOptions } from "./BookOptions";

export const Book = ({ book, handleChange }) => {
  return (
    <li key={book.id} className="books-grid">
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail}}`,
            }}
          ></div>
          <BookOptions book={book} handleChange={handleChange} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  );
};
