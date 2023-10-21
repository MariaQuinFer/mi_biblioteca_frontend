import React, { Component } from "react";
import axios from "axios";

import EditorialSidebarList from "../library-component/editorial-manager/editorial-sidebar-list";
import EditorialForm from "../library-component/editorial-manager/editorial-form";

export default class EditorialsManager extends Component {
  constructor() {
    super();

    this.state = {
      editorials: [],
      editorialToEdit: [],
    };

    this.handelNewFormSubmission = this.handelNewFormSubmission.bind(this);
    this.handelEditFormSubmission = this.handelEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearEditorialToEdit = this.clearEditorialToEdit.bind(this);
  }

  clearEditorialToEdit() {
    this.setState({
      editorialToEdit: [],
    });
  }

  handleEditClick(editorial) {
    this.setState({
      editorialToEdit: editorial,
    });
  }

  handleDeleteClick(editorial) {
    const userResponse = window.confirm(
      "¿Seguro que quiere borrar la editorial de la base de datos?"
    );
    if (userResponse) {
      axios
        .delete(`http://127.0.0.1:5000/editorials/${editorial.id}`)
        .then((response) => {
          this.getEditorials();
          return response.data;
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }

  handelEditFormSubmission() {
    this.getEditorials();
  }

  handelNewFormSubmission() {
    this.getEditorials();
  }

  handleFormSubmissionError(error) {
    console.log("handleFormSubmissionError error", error);
  }

  getEditorials() {
    axios
      .get("http://127.0.0.1:5000/editorials")
      .then((response) => {
        this.setState({
          editorials: [...response.data.editorials],
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.getEditorials();
  }

  render() {
    return (
      <div className="library-manager-wrapper">
        <div className="upper-side">
          <EditorialForm
            handelNewFormSubmission={this.handelNewFormSubmission}
            handelEditFormSubmission={this.handelEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            clearEditorialToEdit={this.clearEditorialToEdit}
            editorialToEdit={this.state.editorialToEdit}
          />
          <br />
        </div>
        <div className="lower-side">
          <EditorialSidebarList
            handleDeleteClick={this.handleDeleteClick}
            handleEditClick={this.handleEditClick}
            data={this.state.editorials}
          />
        </div>
      </div>
    );
  }
}
