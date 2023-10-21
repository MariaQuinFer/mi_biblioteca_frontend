import React, { Component } from "react";
import axios from "axios";
import UsersTableList from "../library-component/user-manager/users-list";

export default class UserManager extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      editModalIsOpen: false,
    };

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  handleEditClick() {
    this.setSatet({
      editModalIsOpen: true,
    });
  }

  handleDeleteClick(user) {
    const userResponse = window.confirm(
      "¿Seguro que quiere borrar el usuario del sistema?"
    );
    if (userResponse) {
      axios
        .delete(`http://127.0.0.1:5000/users/${user.id}`)
        .then((response) => {
          // console.log("responseDelete", response);
          return this.getUsers();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }

  getUsers() {
    axios
      .get("http://127.0.0.1:5000/users")
      .then((response) => {
        // console.log("responseUsers", response);
        this.setState({
          users: [...response.data.users],
        });
      })
      .catch((error) => {
        console.log("ErrorGetUsers:", error);
      });
  }

  componentDidMount() {
    this.getUsers();
  }
  render() {
    return (
      <div className="library-manager-wrapper">
        <div className="upper-side">
          <h1>Gestón de Usuarios</h1>
        </div>
        <div className="lower-side">
          <UsersTableList
            handleDeleteClick={this.handleDeleteClick}
            getUsers={this.getUsers}
            data={this.state.users}
          />
        </div>
      </div>
    );
  }
}
