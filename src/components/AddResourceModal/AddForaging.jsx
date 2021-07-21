import React from "react";
import { Modal } from "react-bootstrap";

function AddForaging({ prev, next }) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Foraging</Modal.Title>
      </Modal.Header>

      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </>
  );
}

export default AddForaging;
