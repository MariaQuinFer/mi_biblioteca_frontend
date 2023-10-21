import React, { Component } from "react";
import axios from "axios";

import SearchByAuthor from "./SearchByAuthor";
import ResultsByAuthor from "./ResultsByAuthor";

const API = process.env.REACT_APP_API;
// apiURL: `${API}/books`,

export default class ByAuthor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authorName: "",
      booksByAuthor: [],
    };

    this.dataToSearch = this.dataToSearch.bind(this);
    this.checkApi = this.checkApi.bind(this);
  }

  dataToSearch(authorName) {
    this.setState(
      {
        authorName: authorName,
      },

      //callback, volvemos a llamar a funcion cuando se actualiza el estado
      () => {
        this.checkApi();
      }
    );
  }

  checkApi() {
    const authorName = this.state.authorName;
    console.log(authorName);

    // const url = `${API}/books_by_author/${authorName}`;
    const url = `http://127.0.0.1:5000/books_by_author/${authorName}`;
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        this.setState({
          booksByAuthor: response.data.books,
        });
        console.log(response.data.books);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="search-wrapper">
        <div className="search-header">
          <SearchByAuthor dataToSearch={this.dataToSearch} />
        </div>
        <ResultsByAuthor booksByAuthor={this.state.booksByAuthor} />
      </div>
    );
  }
}
