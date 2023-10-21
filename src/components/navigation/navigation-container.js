import React, { Fragment } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationContainer = (props) => {
  const adminDynamicLink = () => {
    return (
      <Fragment>
        <p>GESTIÓN</p>
        <div className="nav-link-wrapper">
          <NavLink to="/books-manager" activeClassName="nav-link-active">
            LIBROS
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/authors-manager" activeClassName="nav-link-active">
            AUTORES
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/editorials-manager" activeClassName="nav-link-active">
            EDITORIALES
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/genres-manager" activeClassName="nav-link-active">
            GÉNEROS
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/loan-manager" activeClassName="nav-link-active">
            PRÉSTAMOS
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/users-manager" activeClassName="nav-link-active">
            USUARIOS
          </NavLink>
        </div>
      </Fragment>
    );
  };

  const dynamicLink = (route, linkText) => {
    return (
      <Fragment>
        <div className="nav-link-wrapper">
          <NavLink to="/search" activeClassName="nav-link-active">
            BUSCADOR
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink
            to={`/user/${props.idUser}`}
            activeClassName="nav-link-active">
            {props.fullname}
          </NavLink>
        </div>
      </Fragment>
    );
  };

  const dynamicLinkNotLoggedIn = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSingOut = () => {
    localStorage.removeItem("token");
    props.history.push("/");
    props.handleSuccessfulLogout();
  };

  return (
    <Fragment>
      <div className="nav-wrapper-menu">
        <div className="nav-left-side">
          <div className="nav-logo">
            <NavLink exact to="/" activeClassName="nav-link-active">
              {""}
            </NavLink>
          </div>
          <div className="nav-center-side">
            <div className="nav-name">
              <NavLink exact to="/" activeClassName="nav-link-active">
                MI PEQUEÑA BIBLIOTECA
              </NavLink>
            </div>
            <div className="link-wrapper">
              <div className="nav-link-wrapper">
                <NavLink exact to="/" activeClassName="nav-link-active">
                  INICIO
                </NavLink>
              </div>

              <div className="nav-link-wrapper">
                <NavLink to="/about" activeClassName="nav-link-active">
                  INFORMACIÓN
                </NavLink>
              </div>

              {props.loggedInStatus === "LOGGED_IN"
                ? dynamicLink([("/search", "BUSCADOR"), ("/user", "MI SITIO")])
                : null}
            </div>
          </div>
        </div>
        <div className="nav-right-side">
          {props.loggedInStatus === "NOT_LOGGED_IN"
            ? dynamicLinkNotLoggedIn("/auth", "INICIAR SESION")
            : null}

          {props.loggedInStatus === "LOGGED_IN" ? (
            <a className="log-out" onClick={handleSingOut}>
              <FontAwesomeIcon icon="power-off" />
            </a>
          ) : null}
        </div>
      </div>
      <div className="nav-wrapper-submenu">
        {props.usertype === "admin" ? adminDynamicLink() : null}
      </div>
    </Fragment>
  );
};
export default withRouter(NavigationContainer);
