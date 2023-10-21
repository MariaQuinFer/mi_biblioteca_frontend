import React, { Component } from "react";
import BookItem from "../../book/book-item";
// import Paginacion from "./Paginacion";

export default class ResultsByGenre extends Component {
  showBooks = () => {
    const booksByGenre = this.props.booksByGenre;
    //console.log(booksByGenre);

    if (booksByGenre === 0)
      return <h1>No hay libros en el catálogo de ese género literario</h1>;

    //console.log(booksByGenre);

    return (
      <React.Fragment>
        <div className="mostrar-Books">
          {booksByGenre.map((bookByGenre) => (
            <BookItem key={bookByGenre.ISBN} bookItem={bookByGenre} />
          ))}
        </div>
        {/* <Paginacion
          paginaAnterior={this.props.paginaAnterior}
          paginaSiguiente={this.props.paginaSiguiente}
        /> */}
      </React.Fragment>
    );
  };

  render() {
    return <React.Fragment>{this.showBooks()}</React.Fragment>;
  }
}
