import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BookTableList = (props) => {
  const booksList = props.data.map((book) => {
    return (
      <tbody key={book.id}>
        <tr>
          <td>
            <Link to={`/book/${book.ISBN}`}>
              <img
                className="book-cover"
                src={book.portada}
                alt={book.titulo}></img>
            </Link>
          </td>
          <td>{book.ISBN}</td>
          <td>{book.titulo}</td>
          <td>{book.idAutor}</td>
          <td className="actions">
            <a
              className="action-icon"
              onClick={() => props.handleEditClick(book)}>
              <FontAwesomeIcon icon="edit" />
            </a>
            <a
              className="action-icon"
              onClick={() => props.handleDeleteClick(book)}>
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
          <th>Portada</th>
          <th>ISBN</th>
          <th>Titulo</th>
          <th>Autor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      {booksList}
    </table>
  );
};

export default BookTableList;
