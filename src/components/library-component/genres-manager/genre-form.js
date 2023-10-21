import React, { Component } from "react";
import axios from "axios";

export default class GenreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      editMode: false,
      apiUrl: "http://127.0.0.1:5000/genres",
      apiAction: "post",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (Object.keys(this.props.genreToEdit).length > 0) {
      const { id, name } = this.props.genreToEdit;

      this.props.clearGenreToEdit();
      this.setState({
        name: name || "",
        editMode: true,
        apiUrl: `http://127.0.0.1:5000/genres/${id}`,
        apiAction: "put",
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: { name: this.state.name },
    })
      .then((response) => {
        if (this.state.editMode === true) {
          this.props.handelEditFormSubmission();
          console.log("update", response);
        } else {
          this.props.handelNewFormSubmission();
          console.log("created", response);
        }
        this.setState({
          name: "",
          editMode: false,
          apiUrl: "http://127.0.0.1:5000/genres",
          apiAction: "post",
        });
      })
      .catch((error) => console.error("Errorrr", error));
    e.preventDefault();
  }

  render() {
    return (
      <div className="library-form-wrapper">
        <h1>Añadir Género</h1>
        <form onSubmit={this.handleSubmit} className="form-wrapper">
          <input
            type="text"
            name="name"
            placeholder="Género"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button type="submit">Aceptar</button>
        </form>
      </div>
    );
  }
}
