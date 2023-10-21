import React, { Component, Fragment } from "react";

export default class SearchByEditorial extends Component {
  searchRef = React.createRef();

  handleData = (e) => {
    e.preventDefault();

    // Tomamos el valor del input
    const editorial = this.searchRef.current.value;
    //console.log(editorial);

    // Lo enviamos al padre
    this.props.dataToSearch(editorial);
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleData}>
          <div className="search-bar-wrapper">
            <input
              ref={this.searchRef}
              type="text"
              placeholder="Busqueda por Editorial"
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
