import React from "react";
import { Modal } from "react-bootstrap";

function AddForaging() {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Foraging</Modal.Title>
      </Modal.Header>

      <button onClick={() => console.log("previous was clicked")}>
        Previous
      </button>
      <button onClick={() => console.log("next was clicked")}>Next</button>
    </>
  );
}

export default AddForaging;
