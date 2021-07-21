import React from "react";
import { Modal, Form } from "react-bootstrap";
import SharedFormFields from "./SharedFormFields";

function AddForaging({ prev, next }) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Foraging</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          onSubmit={e => {
            e.preventDefault();
            console.log("boop");
          }}
        >
          <SharedFormFields />
        </Form>
      </Modal.Body>

      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
    </>
  );
}

export default AddForaging;
