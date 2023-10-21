import React, { Component } from "react";
import axios from "axios";

export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIdUser: this.props.match.params.slug,
      user: {},
      status: "",
    };
  }

  getUSer() {
    axios
      .get(`http://127.0.0.1:5000/lend/${this.state.currentIdUser}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("respuestaUsuario", response);
          this.setState({
            user: response.data.User,
            status: response.status,
          });
        } else {
          axios
            .get(`http://127.0.0.1:5000/users/${this.state.currentIdUser}`)
            .then((response) => {
              console.log("resUsuario", response);
              this.setState({
                user: response.data.user,
              });
            });
        }
      })
      .catch((error) => {
        console.log("getUserError", error);
      });
  }

  componentDidMount() {
    this.getUSer();
  }
  render() {
    //console.log("currentIdUser", this.state.currentIdUser);
    const {
      username,
      email,
      password,
      fullname,
      titulo,
      nombre,
      return_date,
      ISBN,
    } = this.state.user;
    return (
      <div>
        <h1>{fullname}</h1>
        <p>Nombre de usuario: {username}</p>
        <p>Correo electrónico: {email}</p>
        {this.state.status === 200 ? (
          <div>
            <p>
              Libro en préstamo: {titulo} de {nombre}
            </p>
            <p>ISBN: {ISBN} </p>
            <p>Fecha de devolución: {return_date}</p>
          </div>
        ) : null}
      </div>
    );
  }
}
