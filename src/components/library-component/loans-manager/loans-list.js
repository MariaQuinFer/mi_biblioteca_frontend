import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const LoanTableList = (props) => {
  const loansList = props.data.map((loan) => {
    return (
      <tbody key={loan.id}>
        <tr>
          <td>{loan.id}</td>
          <td>{loan.fullname}</td>
          <td>{loan.ISBN}</td>
          <td>{loan.titulo}</td>
          <td>{loan.autor}</td>
          <td>{loan.departury_date}</td>
          <td>{loan.return_date}</td>
          <td>{loan.action}</td>
          <td className="actions">
            {
              <Fragment>
                <p>Cambiar el estado del libro:</p>
                <select
                  className="edit-usertype"
                  value={loan.action}
                  onChange={(e) => {
                    let data = { action: e.target.value };
                    //console.log("data", data);
                    let id = loan.id;
                    const userResponse = window.confirm(
                      "¿Seguro que quiere devolver el libro?"
                    );

                    if (userResponse) {
                      axios
                        .put(`http://127.0.0.1:5000/lend/${id}`, data)
                        .then((response) => {
                          //console.log("response", response);
                          return props.getLoans();
                        })
                        .catch((error) => {
                          console.log("ERROR", error);
                        });
                    }
                  }}>
                  <option value="Prestado">Prestado</option>
                  <option value="Devuelto">Devuelto</option>
                </select>
              </Fragment>
            }
            {/* <a
              className="action-icon"
              onClick={() => props.handleEditClick(loan)}>
              <FontAwesomeIcon icon="edit" />
            </a> */}
            <a
              className="action-icon"
              onClick={() => props.handleDeleteClick(loan)}>
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
          <th>id_préstamo</th>
          <th>Usuario</th>
          <th>ISBN</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Fecha de Salida</th>
          <th>Fecha de entadas</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      {loansList}
    </table>
  );
};

export default LoanTableList;
