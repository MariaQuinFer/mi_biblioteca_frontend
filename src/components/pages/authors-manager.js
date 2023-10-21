import React, { Component } from "react";
import axios from "axios";

import AuthorSidebarList from "../library-component/author-manager/author-sidebar-list";
import AuthorForm from "../library-component/author-manager/author-form";

export default class AuthorManager extends Component {
  constructor() {
    super();

    this.state = {
      authors: [],
      authorToEdit: [],
    };

    this.handelNewFormSubmission = this.handelNewFormSubmission.bind(this);
    this.handelEditFormSubmission = this.handelEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearAuthorToEdit = this.clearAuthorToEdit.bind(this);
  }

  clearAuthorToEdit() {
    this.setState({
      authorToEdit: [],
    });
  }

  handleEditClick(author) {
    this.setState({
      authorToEdit: author,
    });
  }

  handleDeleteClick(author) {
    const userResponse = window.confirm(
      "¿Seguro que quiere borrar el autor de la base de datos?"
    );
    if (userResponse) {
      axios
        .delete(`http://127.0.0.1:5000/authors/${author.id}`)
        .then((response) => {
          this.getAuthors();
          return response.data;
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }

  handelEditFormSubmission() {
    this.getAuthors();
  }

  handelNewFormSubmission() {
    this.getAuthors();
  }

  handleFormSubmissionError(error) {
    console.log("handleFormSubmissionError error", error);
  }

  getAuthors() {
    axios
      .get("http://127.0.0.1:5000/authors")
      .then((response) => {
        this.setState({
          authors: [...response.data.authors],
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.getAuthors();
  }

  render() {
    return (
      <div className="library-manager-wrapper">
        <div className="upper-side">
          <AuthorForm
            handelNewFormSubmission={this.handelNewFormSubmission}
            handelEditFormSubmission={this.handelEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            clearAuthorToEdit={this.clearAuthorToEdit}
            authorToEdit={this.state.authorToEdit}
          />
          <br />
        </div>
        <div className="lower-side">
          <AuthorSidebarList
            handleDeleteClick={this.handleDeleteClick}
            handleEditClick={this.handleEditClick}
            data={this.state.authors}
          />
        </div>
      </div>
    );
  }
}
