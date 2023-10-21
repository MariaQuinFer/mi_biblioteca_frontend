import React, { Component } from "react";
import axios from "axios";

import SearchByGenre from "./SearchByGenre";
import ResultsByGenre from "./ResultsByGenre";

const API = process.env.REACT_APP_API;
// apiURL: `${API}/books`,

export default class ByAuthor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genre: "",
      booksByGenre: [],
    };

    this.dataToSearch = this.dataToSearch.bind(this);
    this.checkApi = this.checkApi.bind(this);
  }

  dataToSearch(genre) {
    this.setState(
      {
        genre: genre,
      },

      //callback, volvemos a llamar a funcion cuando se actualiza el estado
      () => {
        this.checkApi();
      }
    );
  }

  checkApi() {
    const genre = this.state.genre;
    //console.log(genre);

    // const url = `${API}/books_by_genre/${genre}`;
    const url = `http://127.0.0.1:5000/books_by_genre/${genre}`;
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        this.setState({
          booksByGenre: response.data.books,
        });
        //console.log(response.data.books);
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log(url);
  }

  render() {
    return (
      <div className="search-wrapper">
        <div className="search-header">
          <SearchByGenre dataToSearch={this.dataToSearch} />
        </div>
        <ResultsByGenre booksByGenre={this.state.booksByGenre} />
      </div>
    );
  }
}
