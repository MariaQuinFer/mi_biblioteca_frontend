import React, { Component } from "react";
import BookItem from "../../book/book-item";

export default class ResultsByAuthor extends Component {
  showBooks = () => {
    const booksByAuthor = this.props.booksByAuthor;
    //console.log(booksByAuthor);

    if (booksByAuthor === 0) return null;

    //console.log(booksByAuthor);

    return (
      <React.Fragment>
        <div className="show-books">
          {booksByAuthor.map((bookByAuthor) => (
            <BookItem key={bookByAuthor.ISBN} bookItem={bookByAuthor} />
          ))}
        </div>
      </React.Fragment>
    );
  };

  render() {
    return <React.Fragment>{this.showBooks()}</React.Fragment>;
  }
}
