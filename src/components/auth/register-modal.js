import React, { Component } from "react";
import ReactModal from "react-modal";

import RegisterForm from "./register-form";

ReactModal.setAppElement(".app-wrapper");

export default class RegisterModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        marginRigth: "-50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
      },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.90)",
      },
    };

    this.handleSuccessfulFormSubmission =
      this.handleSuccessfulFormSubmission.bind(this);
  }
  handleSuccessfulFormSubmission(register) {
    console.log("register from register form", register);
  }

  render() {
    return (
      <ReactModal
        style={this.customStyles}
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalIsOpen}>
        <h1>Nuevo Usuario</h1>
        <RegisterForm
          handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
        />
      </ReactModal>
    );
  }
}
