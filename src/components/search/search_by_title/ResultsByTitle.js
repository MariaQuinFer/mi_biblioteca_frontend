import React, { Component } from "react";
import BookItem from "../../book/book-item";
// import Paginacion from "./Paginacion";

export default class ResultsByTitle extends Component {
  showBooks = () => {
    const booksByTitle = this.props.booksByTitle;
    //console.log(booksByTitle);

    if (booksByTitle === 0) return null;

    //console.log(booksByTitle);

    return (
      <React.Fragment>
        <div className="mostrar-Books">
          {booksByTitle.map((bookByTitle) => (
            <BookItem key={bookByTitle.ISBN} bookItem={bookByTitle} />
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
