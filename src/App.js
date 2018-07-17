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
  
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf
            books={this.state.books}
          />
        )}/>
        <Route exact path='/search' render={() => (
          <Search
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
