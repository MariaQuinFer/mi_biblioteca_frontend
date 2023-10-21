import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const UsersTableList = (props) => {
  const usersList = props.data.map((user) => {
    return (
      <tbody key={user.id}>
        <tr>
          <td>{user.id}</td>
          <td>{user.fullname}</td>
          <td>{user.email}</td>
          <td>{user.username}</td>
          <td>{user.usertype}</td>
          <td className="actions">
            {
              <Fragment>
                <p>Modificar el tipo de usuario:</p>
                <select
                  className="edit-usertype"
                  value={user.usertype}
                  onChange={(e) => {
                    let data = { usertype: e.target.value };
                    //console.log("data", data);
                    let id = user.id;
                    const userResponse = window.confirm(
                      "¿Seguro que quiere cambiar el tipo de usuario?"
                    );

                    if (userResponse) {
                      axios
                        .put(`http://127.0.0.1:5000/users/${id}`, data)
                        .then((response) => {
                          //console.log("response", response);
                          return props.getUsers();
                        })
                        .catch((error) => {
                          console.log("ERROR", error);
                        });
                    }
                  }}>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </Fragment>
            }
            {/* <a
              className="action-icon"
              onClick={() => props.handleEditClick(user)}>
              <FontAwesomeIcon icon="edit" />
            </a> */}
            <a
              className="action-icon"
              onClick={() => props.handleDeleteClick(user)}>
              <FontAwesomeIcon icon="trash" />
            </a>
          </td>
        </tr>
      </tbody>
    );
  });
  return (
    <table className="simple-table">
      <thead>
        <tr>
          <th>id_usuario</th>
          <th>Usuario</th>
          <th>email</th>
          <th>Alias</th>
          <th>Tipo de usuario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      {usersList}
    </table>
  );
};

export default UsersTableList;
