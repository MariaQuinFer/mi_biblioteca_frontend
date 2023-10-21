import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AuthorSidebarList = (props) => {
  const authorsList = props.data.map((author) => {
    return (
      <tbody key={author.id}>
        <tr>
          <td>{author.id}</td>
          <td>{author.nombre}</td>
          <td className="actions">
            <a
              className="action-icon"
              onClick={() => props.handleEditClick(author)}>
              <FontAwesomeIcon icon="edit" />
            </a>
            <a
              className="action-icon"
              onClick={() => props.handleDeleteClick(author)}>
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
          <th>ID</th>
          <th>Nombre</th>
        </tr>
      </thead>
      {authorsList}
    </table>
  );
};

export default AuthorSidebarList;
