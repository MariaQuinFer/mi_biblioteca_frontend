import React, { Component, Fragment } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

import LibraryItem from "./library-item";

export default class CarouselContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "Novedades",
      isLoading: false,
      books: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://127.0.0.1:5000/carousel")
      .then((response) => {
        //console.log("res", response);

        this.setState({
          books: response.data.books,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  libraryItems = () => {
    return this.state.books.map((book) => {
      return <LibraryItem key={book.id} book={book} />;
    });
  };

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <Fragment>
        <h1>{this.state.pageTitle}</h1>
        <Carousel autoPlay infiniteLoop>
          {/* <div className="library-items-wrapper">{this.libraryItems()}</div> */}
          {this.state.books.map((book) => (
            <div key={book.id}>
              <img src={book.portada} alt={book.Title} />
              <Link to={`/book/${book.ISBN}`}>
                <p className="legend">{book.Title}</p>
              </Link>
            </div>
          ))}
        </Carousel>
      </Fragment>
    );
  }
}
