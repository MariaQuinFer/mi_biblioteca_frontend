import React, { Component, Fragment } from "react";

export default class SearchByAuthor extends Component {
  searchRef = React.createRef();

  handleData = (e) => {
    e.preventDefault();

    // Tomamos el valor del input
    const authorName = this.searchRef.current.value;
    console.log(authorName);

    // Lo enviamos al padre
    this.props.dataToSearch(authorName);
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleData}>
          <div className="search-bar-wrapper">
            <input
              ref={this.searchRef}
              type="text"
              placeholder="Busqueda por Autor"
            />
            <button className="search-btn btn" type="submit">
              Buscar...
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}
