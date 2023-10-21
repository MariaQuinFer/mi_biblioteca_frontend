import axios from "axios";
import React, { Component } from "react";

export default class BookForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authors: [],
      genres: [],
      editorials: [],
      ISBN: "",
      titulo: "",
      idAutor: 158,
      idGenre: 38,
      idEditorial: 28,
      idioma: "Idioma",
      paginas: "",
      portada: "",
      descripcion: "",
      estado: "Disponible",
      editMode: false,
      apiUrl: "http://127.0.0.1:5000/books",
      apiAction: "post",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (Object.keys(this.props.bookToEdit).length > 0) {
      const {
        ISBN,
        titulo,
        idAutor,
        idGenre,
        idEditorial,
        idioma,
        paginas,
        portada,
        descripcion,
        estado,
      } = this.props.bookToEdit;

      this.props.clearBookToEdit();

      this.setState({
        ISBN: ISBN || "",
        titulo: titulo || "",
        idAutor: idAutor || 158,
        idGenre: idGenre || 38,
        idEditorial: idEditorial || 28,
        idioma: idioma || "Idioma",
        paginas: paginas || "",
        portada: portada || "",
        descripcion: descripcion || "",
        estado: estado || "Disponible",
        editMode: true,
        apiUrl: `http://127.0.0.1:5000/books/${ISBN}`,
        apiAction: "put",
      });
    }
  }

  // buildForm() {
  //   let formData = new FormData();

  //   formData.append("[ISBN]", this.state.ISBN);
  //   formData.append("[tiutlo]", this.state.titulo);
  //   formData.append("[idAutor]", this.state.idAutor);
  //   formData.append("[idGenre]", this.state.idGenre);
  //   formData.append("[idEditiral]", this.state.idEditorial);
  //   formData.append("[idioma]", this.state.idioma);
  //   formData.append("[paginas]", this.state.paginas);
  //   formData.append("[portada]", this.state.portada);
  //   formData.append("[descripcion]", this.state.descripcion);

  //   return formData;
  // }

  handleSubmit(e) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: {
        ISBN: this.state.ISBN,
        titulo: this.state.titulo,
        idAutor: this.state.idAutor,
        idGenre: this.state.idGenre,
        idEditorial: this.state.idEditorial,
        idioma: this.state.idioma,
        paginas: this.state.paginas,
        portada: this.state.portada,
        descripcion: this.state.descripcion,
        estado: this.state.estado,
      },
    })
      .then((response) => {
        if (this.state.editMode === true) {
          this.props.handelEditFormSubmission();
          console.log("RResponse", response);
        } else {
          this.props.handelNewFormSubmission();
        }

        this.setState({
          ISBN: "",
          titulo: "",
          idAutor: 158,
          idGenre: 38,
          idEditorial: 28,
          idioma: "Idioma",
          paginas: "",
          portada: "",
          descripcion: "",
          estado: "Disponible",
          editMode: false,
          apiUrl: "http://127.0.0.1:5000/books",
          apiAction: "post",
        });
      })
      .catch((error) => {
        console.log("Book form handleSubmit error", error);
      });
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getAuthors() {
    axios
      .get("http://127.0.0.1:5000/authors")
      .then((response) => {
        // console.log("respuesta", response.data.authors);
        this.setState({
          authors: response.data.authors,
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }
  getGenres() {
    axios
      .get("http://127.0.0.1:5000/genres")
      .then((response) => {
        // console.log("respuesta", response.data.genres);
        this.setState({
          genres: response.data.genres,
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }
  getEditorials() {
    axios
      .get("http://127.0.0.1:5000/editorials")
      .then((response) => {
        // console.log("respuesta", response.data.editorials);
        this.setState({
          editorials: response.data.editorials,
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.getAuthors();
    this.getGenres();
    this.getEditorials();
  }

  render() {
    return (
      <div className="library-form-wrapper">
        <h1>Añadir Libro</h1>

        <form className="book-form-wrapper" onSubmit={this.handleSubmit}>
          <div className="two-column">
            {" "}
            <input
              type="text"
              name="ISBN"
              placeholder="ISBN"
              value={this.state.ISBN}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              value={this.state.titulo}
              onChange={this.handleChange}
            />
          </div>
          <div className="two-column">
            <select
              className="select-element"
              name="idAutor"
              value={this.state.idAutor}
              onChange={this.handleChange}>
              {this.state.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.nombre}
                </option>
              ))}
            </select>

            <select
              className="select-element"
              name="idGenre"
              value={this.state.idGenre}
              onChange={this.handleChange}>
              {this.state.genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <select
              className="select-element"
              name="idEditorial"
              value={this.state.idEditorial}
              onChange={this.handleChange}>
              {this.state.editorials.map((editorial) => (
                <option key={editorial.id} value={editorial.id}>
                  {editorial.name}
                </option>
              ))}
            </select>

            <select
              className="select-element"
              name="idioma"
              value={this.state.idioma}
              onChange={this.handleChange}>
              <option value="Idioma">Idioma</option>
              <option value="Español">Español</option>
              <option value="Euskera">Euskera</option>
              <option value="Inglés">Inglés</option>
              <option value="Francés">Francés</option>
              <option value="Alemán">Alemán</option>
            </select>
          </div>
          <div className="two-column">
            {" "}
            <input
              type="number"
              name="paginas"
              placeholder="Nº de páginas"
              value={this.state.paginas}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="portada"
              placeholder="Url portada"
              value={this.state.portada}
              onChange={this.handleChange}
            />
          </div>
          <div className="two-column">
            {" "}
            <textarea
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={this.state.descripcion}
              onChange={this.handleChange}
            />
            <select
              className="select-element"
              name="estado"
              value={this.state.estado}
              onChange={this.handleChange}>
              <option value="Disponible">Disponible</option>
              <option value="No disponible">No Disponible</option>
            </select>
          </div>
          <div>
            <button type="submit">Aceptar</button>
            <button type="cancel">Cancelar</button>
          </div>
        </form>
      </div>
    );
  }
}
