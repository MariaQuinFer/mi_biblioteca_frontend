import React, { Component } from "react";
import axios from "axios";

import SearchByEditorial from "./SearchByEditorial";
import ResultsByEditorial from "./ResultsByEditorial";

const API = process.env.REACT_APP_API;
// apiURL: `${API}/books`,

export default class ByAuthor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorial: "",
      booksByEditorial: [],
    };

    this.dataToSearch = this.dataToSearch.bind(this);
    this.checkApi = this.checkApi.bind(this);
  }

  dataToSearch(editorial) {
    this.setState(
      {
        editorial: editorial,
      },

      //callback, volvemos a llamar a funcion cuando se actualiza el estado
      () => {
        this.checkApi();
      }
    );
  }

  checkApi() {
    const editorial = this.state.editorial;
    //console.log(editorial);

    // const url = `${API}/books_by_editorial/${editorial}`;
    const url = `http://127.0.0.1:5000/books_by_editorial/${editorial}`;
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        this.setState({
          booksByEditorial: response.data.books,
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
          <SearchByEditorial dataToSearch={this.dataToSearch} />
        </div>
        <ResultsByEditorial booksByEditorial={this.state.booksByEditorial} />
      </div>
    );
  }
}
