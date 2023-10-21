import React, { Component, Fragment } from "react";

export default class SearchByTitle extends Component {
  searchRef = React.createRef();

  handleData = (e) => {
    e.preventDefault();

    // Tomamos el valor del input
    const title = this.searchRef.current.value;
    //console.log(title);

    // Lo enviamos al padre
    this.props.dataToSearch(title);
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleData}>
          <div className="search-bar-wrapper">
            <input
              ref={this.searchRef}
              type="text"
              placeholder="Busqueda por Título"
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
