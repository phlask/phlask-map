import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import styles from "./AddResourceModal.module.scss";

const ModalOne = ({ prev, next }) => (
  <>
    <Modal.Header closeButton>
      <Modal.Title>Modal One</Modal.Title>
    </Modal.Header>

    <button onClick={prev}>Previous</button>
    <button onClick={next}>Next</button>
  </>
);

function MetaModal() {
  const [formStep, setFormStep] = useState("metaModal");
  const [show, setShow] = useState(false);

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        {formStep === "metaModal" && (
          <Modal.Header closeButton>
            <Modal.Title>Meta Modal</Modal.Title>

            <br />
            <br />

            <button onClick={() => setFormStep("modalOne")}>Next</button>
          </Modal.Header>
        )}

        {formStep === "modalOne" && (
          <ModalOne
            prev={() => setFormStep("metaModal")}
            next={() => console.log("next was pressed")}
          />
        )}
      </Modal>

      <button
        onClick={() => setShow(true)}
        className={`${isMobile ? styles.mobileAddButton : ""} ${
          styles.addButton
        }`}
      >
        <FontAwesomeIcon icon={faPlus} size="2x" />
      </button>
    </>
  );
}

export default MetaModal;
