import React, { Component } from "react";
import BookTableList from "../library-component/books-manager/book-table-list";
import axios from "axios";
import BookForm from "../library-component/books-manager/book-form";

export default class BooksManager extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
      bookToEdit: [],
    };

    this.handelNewFormSubmission = this.handelNewFormSubmission.bind(this);
    this.handelEditFormSubmission = this.handelEditFormSubmission.bind(this);
    this.handelFormSubmissionError = this.handelFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearBookToEdit = this.clearBookToEdit.bind(this);
  }

  clearBookToEdit() {
    this.setState({
      bookToEdit: [],
    });
  }

  handleEditClick(book) {
    this.setState({
      bookToEdit: book,
    });
  }

  handleDeleteClick(book) {
    const userResponse = window.confirm(
      "¿Seguro que quiere borrar el libro del catálogo?"
    );
    if (userResponse) {
      axios
        .delete(`http://127.0.0.1:5000/books/${book.ISBN}`)
        .then((response) => {
          this.getBooks();
          return response.data;
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }

  handelEditFormSubmission() {
    this.getBooks();
  }

  handelNewFormSubmission() {
    this.getBooks();
  }

  handelFormSubmissionError(error) {
    console.log("handleFormSubmissionError", error);
  }

  getBooks() {
    axios
      .get("http://127.0.0.1:5000/books")
      .then((response) => {
        this.setState({
          books: [...response.data.books],
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <div className="library-manager-wrapper">
        <div className="upper-side">
          <BookForm
            handelEditFormSubmission={this.handelEditFormSubmission}
            handelNewFormSubmission={this.handelNewFormSubmission}
            handelFormSubmissionError={this.handelFormSubmissionError}
            clearBookToEdit={this.clearBookToEdit}
            bookToEdit={this.state.bookToEdit}
          />
        </div>
        <div className="lower-side">
          <BookTableList
            handleDeleteClick={this.handleDeleteClick}
            handleEditClick={this.handleEditClick}
            data={this.state.books}
          />
        </div>
      </div>
    );
  }
}
