import React, { Component } from "react";
import axios from "axios";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      fullname: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    axios
      .post("http://127.0.0.1:5000/register", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        fullname: this.state.fullname,
      })
      .then((response) => {
        this.props.handleSuccessfulFormSubmission(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    e.peventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="fullname"
          placeholder="Nombre completo"
          value={this.state.fullname}
          onChange={this.handleChange}
        />
        <button type="submit">Aceptar</button>
      </form>
    );
  }
}
