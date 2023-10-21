import React, { Component } from "react";
import moment from "moment/moment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPowerOff,
  faSignOutAlt,
  faCircleInfo,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home"; //carousel-container está dentro de Home
import About from "./pages/about";
import BooksManager from "./pages/books-manager";
import BookDetail from "./book/book-detail";
import NoMatch from "./pages/no-match";
import Auth from "./pages/auth";
import Search from "./pages/search";
import AuthorManager from "./pages/authors-manager";
import EditorialsManager from "./pages/editorials-manager";
import GenresManager from "./pages/genres-manager";
import UserManager from "./pages/users-manager";
import ResultToSearch from "./pages/result-to-search";
import UserDetail from "./user/user-detail";
import LoanManager from "./pages/loan-manager";

library.add(faTrash, faPowerOff, faSignOutAlt, faEdit, faCircleInfo);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      loggedIn: false,
      username: "",
      email: "",
      fullname: "",
      usertype: "",
      idUser: "",
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
    {
      this.checkLoginStatus();
    }
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      username: "",
      email: "",
      fullname: "",
      usertype: "",
      idUser: "",
    });
  }

  checkLoginStatus = () => {
    // Obtiene el token JWT del localStorage
    const token = localStorage.getItem("token");
    // if (!token) {
    //   // Si no hay token, redirige al inicio de sesión
    //   history.push("/");
    // } else {
    //   // Si hay token, lo envia al API de Flask para obtener los datos del usuario
    axios
      .get("http://localhost:5000/profile", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        // Guarda los datos del usuario en el estado
        // console.log("logged_in:", response);
        const idUser = response.data.current_client.id;
        const username = response.data.current_client.username;
        const email = response.data.current_client.email;
        const fullname = response.data.current_client.fullname;
        const usertype = response.data.current_client.usertype;
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return fullname;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({
            loggedIn: true,
            loggedInStatus: "LOGGED_IN",
            username: username,
            email: email,
            fullname: fullname,
            usertype: usertype,
            idUser: idUser,
          });
        } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);

        // Muestra el mensaje de error y redirige al inicio de sesión
        // alert(error.response.data.message);
        // history.push("/");
      });
  };

  componentDidMount() {
    this.checkLoginStatus();
  }

  authoraizedPages() {
    return [
      <Route key="user" path="/user/:slug" component={UserDetail} />,
      <Route path="/search" component={Search} />,
      <Route exact path="/books" component={ResultToSearch} />,
    ];
  }

  adminAuthoraizedPages() {
    return [
      <Route
        key="library-manager"
        path="/books-manager"
        component={BooksManager}
      />,
      <Route path="/authors-manager" component={AuthorManager} />,
      <Route path="/editorials-manager" component={EditorialsManager} />,
      <Route path="/genres-manager" component={GenresManager} />,
      <Route path="/loan-manager" component={LoanManager} />,
      <Route path="/users-manager" component={UserManager} />,
    ];
  }

  render() {
    return (
      <div className="container">
        <Router>
          <NavigationContainer
            loggedInStatus={this.state.loggedInStatus}
            idUser={this.state.idUser}
            usertype={this.state.usertype}
            fullname={this.state.fullname}
            handleSuccessfulLogout={this.handleSuccessfulLogout}
          />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/auth"
              render={(props) => (
                <Auth
                  {...props}
                  handleSuccessfulLogin={this.handleSuccessfulLogin}
                  handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                />
              )}
            />
            <Route
              exact
              path="/book/:slug"
              render={(props) => (
                <BookDetail
                  {...props}
                  idUser={this.state.idUser}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            ,
            <Route path="/about" component={About} />
            {this.state.loggedInStatus === "LOGGED_IN"
              ? this.authoraizedPages()
              : null}
            {this.state.usertype === "admin"
              ? this.adminAuthoraizedPages()
              : null}
            <Route component={NoMatch} />
          </Switch>

          <div className="footer">
            <hr />

            <p>
              {`Gracias por visitar Mi Pequeña Biblioteca en
              ${moment().format("MMM Do YYYY")}`}
            </p>
          </div>
        </Router>
        <hr />
      </div>
    );
  }
}
