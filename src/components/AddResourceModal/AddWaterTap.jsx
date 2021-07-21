import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
// eslint-disable-next-line import/no-unresolved
import SharedFormFields from "./SharedFormFields";

function addWaterTap({ prev, next }) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Water Tap</Modal.Title>
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

export default addWaterTap;
