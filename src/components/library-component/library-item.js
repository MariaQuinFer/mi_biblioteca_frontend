import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LybraryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryItemClass: "",
    };
  }

  handleMouseEnter = () => {
    this.setState({ libraryItemClass: "image-blur" });
  };

  handleMouseLeave = () => {
    this.setState({ libraryItemClass: "" });
  };

  render() {
    const { id, ISBN, Title, Author, portada } = this.props.book;

    return (
      <div
        key={id}
        className="library-item-wrapper"
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}>
        <div
          className={"library-img-background " + this.state.libraryItemClass}
          style={{
            backgroundImage: "url(" + portada + ")",
          }}
        />
        <div className="img-text-wrapper">
          <Link to={`/book/${ISBN}`}>
            <div className="subtitle">
              {Title}, {Author}
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
