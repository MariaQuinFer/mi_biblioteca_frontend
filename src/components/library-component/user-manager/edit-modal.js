import React, { Component } from "react";
import ReactModal from "react-modal";
import UsertypeEditForm from "./usertype-edit-form";

ReactModal.setAppElement(".app-wrapper");

export default class UsertypeEditModal extends Component {
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
  }
  render() {
    return (
      <ReactModal
        style={this.customStyles}
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalIsOpen}>
        <h1>Editar tipo de usuario</h1>
        <RegisterForm
          handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
        />
      </ReactModal>
    );
  }
}
