import React from "react";
import { Modal } from "react-bootstrap";

function AddBathroom({ prev, next }) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Bathroom</Modal.Title>
      </Modal.Header>

      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </>
  );
}

export default AddBathroom;
