import React, { Component } from "react";
import ByAuthor from "../search/search_by_auhtor/ByAuthor";
import ByTitle from "../search/search_by_title/ByTitle";
import ByGenre from "../search/search_by_genre/ByGenre";
import ByEditorial from "../search/search_by_editorial/ByEditorial";

export default class Search extends Component {
  render() {
    return (
      <div>
        <ByAuthor />
        <ByTitle />
        <ByEditorial />
        <ByGenre />
      </div>
    );
  }
}
