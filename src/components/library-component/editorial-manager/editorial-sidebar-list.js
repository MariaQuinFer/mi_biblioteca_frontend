import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const EditorialSidebarList = (props) => {
  const editorialsList = props.data.map((editorial) => {
    return (
      <tbody key={editorial.id}>
        <tr>
          <td>{editorial.id}</td>
          <td>{editorial.name}</td>
          <td className="actions">
            <a
              className="action-icon"
              onClick={() => props.handleEditClick(editorial)}>
              <FontAwesomeIcon icon="edit" />
            </a>
            <a
              className="action-icon"
              onClick={() => props.handleDeleteClick(editorial)}>
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
      {editorialsList}
    </table>
  );
};
export default EditorialSidebarList;
