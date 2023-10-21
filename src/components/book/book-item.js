import React from "react";
import { Link } from "react-router-dom";

const BookItem = (props) => {
  const {
    ISBN,
    titulo,
    autor,
    genero,
    editorial,
    idioma,
    paginas,
    portada,
    descripcion,
    estado,
  } = props.bookItem;
  return (
    <div className="book-wrapper">
      <Link to={`/book/${ISBN}`}>
        <img className="book-cover" src={portada} alt={titulo}></img>{" "}
      </Link>
      <div className="book-description">
        <Link to={`/book/${ISBN}`}>
          <p className="text">{titulo} </p>
        </Link>

        <p className="text">{autor} </p>
        {/* <p className="text">{ISBN} </p>
        <p className="text">{genero} </p>
        <p className="text">{editorial} </p>
        <p className="text">{idioma} </p>
        <p className="text">{paginas} </p>
        <p className="text">{descripcion} </p>
        <p className="text">{estado} </p> */}

        {/* <a href={largeImageURL} target='_blank' className='btn'>Ver Imagen</a> */}
        {/* target="_blank" abre en una nueva pestaña */}
      </div>
    </div>
  );
};

export default BookItem;
