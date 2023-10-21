import React, { Component } from "react";
import axios from "axios";

import GenreSidebarList from "../library-component/genres-manager/genre-sidebar-list";
import GenreForm from "../library-component/genres-manager/genre-form";

export default class GenresManager extends Component {
  constructor() {
    super();

    this.state = {
      genres: [],
      genreToEdit: [],
    };

    this.handelNewFormSubmission = this.handelNewFormSubmission.bind(this);
    this.handelEditFormSubmission = this.handelEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearGenreToEdit = this.clearGenreToEdit.bind(this);
  }

  clearGenreToEdit() {
    this.setState({
      genreToEdit: [],
    });
  }

  handleEditClick(author) {
    this.setState({
      genreToEdit: author,
    });
  }

  handleDeleteClick(genre) {
    const userResponse = window.confirm(
      "¿Seguro que quiere borrar el género de la base de datos?"
    );
    if (userResponse) {
      axios
        .delete(`http://127.0.0.1:5000/genres/${genre.id}`)
        .then((response) => {
          this.getGenres();
          return response.data;
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }

  handelEditFormSubmission() {
    this.getGenres();
  }

  handelNewFormSubmission() {
    this.getGenres();
  }

  handleFormSubmissionError(error) {
    console.log("handleFormSubmissionError error", error);
  }

  getGenres() {
    axios
      .get("http://127.0.0.1:5000/genres")
      .then((response) => {
        // console.log("res", response);

        this.setState({
          genres: [...response.data.genres],
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <div className="library-manager-wrapper">
        <div className="upper-side">
          <GenreForm
            handelNewFormSubmission={this.handelNewFormSubmission}
            handelEditFormSubmission={this.handelEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            clearGenreToEdit={this.clearGenreToEdit}
            genreToEdit={this.state.genreToEdit}
          />
          <br />
        </div>
        <div className="lower-side">
          <GenreSidebarList
            handleDeleteClick={this.handleDeleteClick}
            handleEditClick={this.handleEditClick}
            data={this.state.genres}
          />
        </div>
      </div>
    );
  }
}
