import React, { Component } from "react";
import axios from "axios";

export default class BookDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentISBN: this.props.match.params.slug,
      bookItem: {},
      idUser: this.props.idUser,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/lend",
      data: {
        idUser: this.state.idUser,
        ISBN: this.state.currentISBN,
      },
    })
      .then((response) => {
        console.log("respuesta", response);
        this.getBookItem();
      })
      .catch((error) => {
        console.log("Erroren el préstamo", error);
      });
  }

  getBookItem() {
    axios
      .get(`http://127.0.0.1:5000/books/${this.state.currentISBN}`)
      .then((response) => {
        //console.log("response", response);
        this.setState({
          bookItem: response.data.book,
        });
      })

      .catch((error) => {
        console.log("getBookItemerror", error);
      });
  }

  componentDidMount() {
    this.getBookItem();
  }

  render() {
    console.log("currentISBN", this.state.currentISBN);
    console.log("idUser", this.state.idUser);

    const {
      ISBN,
      descripcion,
      estado,
      idAutor,
      idEditorial,
      idGenre,
      idioma,
      paginas,
      portada,
      titulo,
    } = this.state.bookItem;
    return (
      <div className="book-wrapper">
        <h1>{titulo}</h1>
        <h2>{idAutor}</h2>
        <div className="book-detail-wrapper">
          <div className="book-cover-wrapper">
            {" "}
            <img src={portada} />
          </div>
          <div className="book-container-wrapper">
            {" "}
            <p>{descripcion}</p>
            <p>{idGenre}</p>
            <p>{idEditorial}</p>
            <p>{idioma}</p>
            <p>{paginas} páginas</p>
          </div>
        </div>

        <br />
        {estado === "Disponible" ? (
          <h3 style={{ color: "green" }}>{estado}</h3>
        ) : (
          <h3 style={{ color: "red" }}>{estado}</h3>
        )}

        {this.props.loggedInStatus === "LOGGED_IN" &&
        estado === "Disponible" ? (
          <button onClick={this.handleSubmit}>Solicitar préstamo</button>
        ) : null}
      </div>
    );
  }
}
