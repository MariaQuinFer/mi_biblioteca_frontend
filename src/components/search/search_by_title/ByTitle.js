import React, { Component } from "react";
import axios from "axios";

import SearchByTitle from "./SearchByTitle";
import ResultsByTitle from "./ResultsByTitle";

const API = process.env.REACT_APP_API;
// apiURL: `${API}/books`,

export default class ByTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      booksByTitle: [],
    };

    this.dataToSearch = this.dataToSearch.bind(this);
    this.checkApi = this.checkApi.bind(this);
  }

  dataToSearch(title) {
    this.setState(
      {
        title: title,
      },

      //callback, volvemos a llamar a funcion cuando se actualiza el estado
      () => {
        this.checkApi();
      }
    );
  }

  checkApi() {
    const title = this.state.title;
    //console.log(title);

    // const url = `${API}/books_by_title/${title}`;
    const url = `http://127.0.0.1:5000/books_by_title/${title}`;
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        this.setState({
          booksByTitle: response.data.books,
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
          <SearchByTitle dataToSearch={this.dataToSearch} />
        </div>
        <ResultsByTitle booksByTitle={this.state.booksByTitle} />
      </div>
    );
  }
}
