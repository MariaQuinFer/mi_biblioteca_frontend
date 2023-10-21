import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const GenreSidebarList = (props) => {
  const genresList = props.data.map((genre) => {
    return (
      <tbody key={genre.id}>
        <tr>
          <td>{genre.id}</td>
          <td>{genre.name}</td>
          <td className="actions">
            <a
              className="action-icon"
              onClick={() => props.handleEditClick(genre)}>
              <FontAwesomeIcon icon="edit" />
            </a>
            <a
              className="action-icon"
              onClick={() => props.handleDeleteClick(genre)}>
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
          <th>Género</th>
        </tr>
      </thead>
      {genresList}
    </table>
  );
};

export default GenreSidebarList;
