import React, { Component } from "react";
import axios from "axios";

import LibraryItem from "./library-item";

// Contenido para Home

export default class LibraryContainer extends Component {
  constructor() {
    super();
    this.state = {
      pageTitle: "Novedades",
      isLoading: false,
      books: [],
    };
  }

  getBook() {
    axios
      .get("http://127.0.0.1:5000/carousel")
      .then((response) => {
        // console.log("res", response);

        this.setState({
          books: response.data.books,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  libraryItems = (e) => {
    return this.state.books.map((book) => {
      return <LibraryItem key={book.id} book={book} />;
    });
  };

  componentDidMount() {
    this.getBook();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>{this.state.pageTitle}</h2>
        <div className="library-items-wrapper">{this.libraryItems()}</div>
      </div>
    );
  }
}
