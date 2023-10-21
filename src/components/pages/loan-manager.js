import axios from "axios";
import React, { Component } from "react";
import LoanTableList from "../library-component/loans-manager/loans-list";

export default class LoanManager extends Component {
  constructor() {
    super();

    this.state = {
      loans: [],
    };

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.getLoans = this.getLoans.bind(this);
  }

  handleDeleteClick(loan) {
    const userResponse = window.confirm(
      "¿Seguro que quiere borrar el registro de base de datos?"
    );
    if (userResponse) {
      axios
        .delete(`http://127.0.0.1:5000/lend/${loan.id}`)
        .then((response) => {
          this.getLoans();
          return response.data;
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }

  getLoans() {
    axios
      .get("http://127.0.0.1:5000/lend")
      .then((response) => {
        // console.log("responseLoans:", response.data.Loans);
        this.setState({
          loans: [...response.data.Loans],
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.getLoans();
  }
  render() {
    return (
      <div className="library-manager-wrapper">
        <div className="upper-side">
          <h1>Gestión de Préstamos</h1>
        </div>
        <div className="lower-side">
          <LoanTableList
            handleDeleteClick={this.handleDeleteClick}
            getLoans={this.getLoans}
            data={this.state.loans}
          />
        </div>
      </div>
    );
  }
}
