import styles from "./AddTapModal.module.scss";
import React, { Component } from "react";
import {
  Modal,
  Button,
  Form,
  OverlayTrigger,
  Popover,
  Accordion
} from "react-bootstrap";
// import ImageUploader from "react-images-upload";
// import * as firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
// import { prod_config, test_config, beta_config } from "../firebase/firebaseConfig";
import AddTapModal from "./AddTapModal";
import AddFoodTapModal from "./AddFoodTapModal";


export class ToggleModal extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }
  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }

  render() {
    return (
      <>
        <Modal 
          show={this.state.show} 
          onHide={this.handleClose}
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title as="h1">Add A Resource</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={styles.spacer}>
              <AddTapModal />
            </div>
            <div className={styles.spacer}>
              <AddFoodTapModal />
            </div>
          </Modal.Body>
        </Modal>
        <button
          onClick={this.handleShow}
          className={`${isMobile ? styles.mobileAddButton : ""} ${
            styles.addButton
          }`}
        >
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </button>

      </>
    );
  }
}

export default ToggleModal;
