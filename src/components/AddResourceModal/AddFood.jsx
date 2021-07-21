import React from "react";
import { Modal } from "react-bootstrap";

function AddFood() {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Food</Modal.Title>
      </Modal.Header>

      <button onClick={() => console.log("previous was clicked")}>
        Previous
      </button>
      <button onClick={() => console.log("next was clicked")}>Next</button>
    </>
  );
}

export default AddFood;
