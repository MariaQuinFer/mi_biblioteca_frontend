import React, { Component } from "react";
import axios from "axios";

export default class AuthorForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      editMode: false,
      apiUrl: "http://127.0.0.1:5000/authors",
      apiAction: "post",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (Object.keys(this.props.authorToEdit).length > 0) {
      const { id, nombre } = this.props.authorToEdit;

      this.props.clearAuthorToEdit();
      this.setState({
        nombre: nombre || "",
        editMode: true,
        apiUrl: `http://127.0.0.1:5000/authors/${id}`,
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
      data: { nombre: this.state.nombre },
    })
      .then((response) => {
        if (this.state.editMode === true) {
          this.props.handelEditFormSubmission();
        } else {
          this.props.handelNewFormSubmission();
          //console.log(response);
        }
        this.setState({
          nombre: "",
          editMode: false,
          apiUrl: "http://127.0.0.1:5000/authors",
          apiAction: "post",
        });
      })
      .catch((error) => console.error("Errorrr", error));
    e.preventDefault();
  }

  render() {
    return (
      <div className="library-form-wrapper">
        <h1>Añadir Autor</h1>
        <form onSubmit={this.handleSubmit} className="form-wrapper">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del autor"
            value={this.state.nombre}
            onChange={this.handleChange}
          />
          <button type="submit">Aceptar</button>
        </form>
      </div>
    );
  }
}
