import React, { Component } from "react";
import BookItem from "../../book/book-item";
// import Paginacion from "./Paginacion";

export default class ResultsByEditorial extends Component {
  showBooks = () => {
    const booksByEditorial = this.props.booksByEditorial;
    //console.log(booksByEditorial);

    if (booksByEditorial === 0) return null;

    //console.log(booksByEditorial);

    return (
      <React.Fragment>
        <div className="mostrar-Books">
          {booksByEditorial.map((bookByEditorial) => (
            <BookItem key={bookByEditorial.ISBN} bookItem={bookByEditorial} />
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
