import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'
import Search from './Search.js'
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  
  handleChange = (book, event) => {
    console.log(this.state)
    let e = event.target.value;
    BooksAPI.update(book, e).then(res => {
      book.shelf = e;
      this.updateBooks();
    })
  }
  
  updateBooks(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  
  
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf
            myBooks={this.state.books}
            handleChange={this.handleChange}
          />
        )}/>
        <Route exact path='/search' render={() => (
          <Search
            myBooks={this.state.books}
            handleChange={this.handleChange}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
