import React, { Component, Fragment } from "react";

export default class SearchByGenre extends Component {
  searchRef = React.createRef();

  handleData = (e) => {
    e.preventDefault();

    // Tomamos el valor del input
    const genre = this.searchRef.current.value;
    //console.log(genre);

    // Lo enviamos al padre
    this.props.dataToSearch(genre);
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleData}>
          <div className="search-bar-wrapper">
            <input
              ref={this.searchRef}
              type="text"
              placeholder="Busqueda por Género"
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
