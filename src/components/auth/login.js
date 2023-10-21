import React, { Component } from "react";
import axios from "axios";

import RegisterModal from "./register-modal";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorText: "",
      registerModalIsOpen: false,
    };
    this.handleNewRegisterClick = this.handleNewRegisterClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.setState({
      registerModalIsOpen: false,
    });
  }

  handleNewRegisterClick() {
    this.setState({
      registerModalIsOpen: true,
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorText: "",
    });
  };

  handleSubmit = (e) => {
    axios
      .post(
        "http://127.0.0.1:5000/login",
        {
          username: this.state.username,
          password: this.state.password,
        },
        { credentials: "include" }
      )
      .then((response) => {
        //console.log("response", response);
        if (response.status === 200) {
          //console.log("You can come in");
          localStorage.setItem("token", response.data.token);
          //console.log(response.data.token);

          this.props.handleSuccessfulAuth();
        } else {
          this.setState({
            errorText: "Usuario y/o contraseña incorrectos",
          });
        }
        this.props.history.push("/");
      })
      .catch((error) => {
        // console.log("errorrr", error);
        this.setState({
          errorText: "Ha ocurrido un error",
        });
        this.props.handleUnsuccessfulAuth();
      });

    e.preventDefault();
  };

  render() {
    return (
      <div className="auth-container">
        <div className="log-in-wrapper">
          <h1>Inicia sesión para acceder</h1>
          <p style={{ color: "red" }}>{this.state.errorText}</p>
          <form className="log-in" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={this.state.username}
              onChange={this.handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div>
              <button>Login</button>
            </div>
          </form>
        </div>
        <RegisterModal
          modalIsOpen={this.state.registerModalIsOpen}
          handleModalClose={this.handleModalClose}
        />
        <div className="new-register-link">
          <a onClick={this.handleNewRegisterClick}>Hacer una cuenta</a>
        </div>
      </div>
    );
  }
}
