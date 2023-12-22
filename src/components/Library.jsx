import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Library.css";

const Library = () => {
  const [bookName, setBookName] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);

  const userName = sessionStorage.getItem("userName");

  const searchBookName = (event) => {
    const searchedBookName = event.target.value;
    setBookName(searchedBookName);
  };

  const filterBooks = () => {
    let filteredBooks = [];
    allBooks.map((book) => {
      if (book.title.toLowerCase().search(bookName.toLowerCase()) >= 0) {
        filteredBooks.push(book);
      }
    });
    setSearchedBooks(filteredBooks);
  };

  useEffect(filterBooks, [bookName, allBooks]);

  //TODO: Fix this method.
  const isBooksAvailable = () => {
    return searchedBooks.length > 0;
  };

  const fetchBooks = async () => {
    const response = await axios.get(
      "https://reactnd-books-api.udacity.com/books",
      { headers: { Authorization: "whatever-you-want" } }
    );
    console.log(response.data.books);
    setAllBooks(response.data.books);
    setSearchedBooks(response.data.books);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const isUserRegistered = () => {
    return !(userName === null);
  };

  return (
    <div className="body">
      <div className="main">
        <h1 className="app-name"> Kalvium Books</h1>

        <input
          type="text"
          value={bookName}
          onChange={searchBookName}
          id="search-book-name"
          placeholder="Search Book Name"
        />

        {isUserRegistered() ? (
          <div className="user-name">Hello {userName}!</div>
        ) : (
          <Link to="/register">
            <button className="registration-button" action="">
              Register
            </button>
          </Link>
        )}
      </div>

      <div className="library">
        {isBooksAvailable() ? (
          searchedBooks.map((book) => {
            return (
              <div className="book" key={book.id}>
                <article className="article" key={book.id}>
                  <div className="book-image">
                    <img
                      className="book-image-source"
                      src={book.imageLinks.thumbnail}
                      alt={book.title}
                    />
                  </div>
                  <div className="book-title">
                    <h2>{book.title}</h2>
                  </div>
                  <div className="book-author">
                    <h3>Authors: {book.authors.join(", ")}</h3>
                  </div>
                  <div>
                    <h4 className="book-price">FREE</h4>
                  </div>
                </article>
              </div>
            );
          })
        ) : (
          <h1 className="no-book-found"> Oops! No Book found. Try Again.</h1>
        )}
      </div>
    </div>
  );
};

export default Library;
