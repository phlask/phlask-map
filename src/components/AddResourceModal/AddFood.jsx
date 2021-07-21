import React from "react";
import { Modal } from "react-bootstrap";

function AddFood({ prev, next }) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Food</Modal.Title>
      </Modal.Header>

      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </>
  );
}

export default AddFood;
