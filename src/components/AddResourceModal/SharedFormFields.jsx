import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import ImageUploader from "react-images-upload";

function SharedFormFields({ props }) {
  return (
    <>
      <Modal.Body>
        <ImageUploader
          withIcon={true}
          buttonText="Choose images"
          onChange={"bloop"}
          imgExtension={[".jpg", ".png", ".gif"]}
          maxFileSize={5242880}
          withPreview={true}
        />

        <Form.Group
          controlId="Address"
          id="time"
          label="End Time"
          type="time"
          defaultValue="07:30"
          value={"value"}
          onChange={() => console.log("boop")}
        >
          <Form.Label>
            <strong>Address</strong>
          </Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group
          controlId="City"
          value={"bloop"}
          onChange={() => console.log("boop")}
        >
          <Form.Label>
            <strong>City</strong>
          </Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group
          controlId="Description"
          value={"bloop"}
          onChange={() => console.log("boop")}
        >
          <Form.Label>
            <strong>Description</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows="2"
            placeholder="A brief description of the tap's location and appearance"
          />
        </Form.Group>
        <Form.Group value={"bloop"} onChange={() => console.log("boop")}>
          <Form.Label>
            <strong>Access to Tap</strong>
          </Form.Label>

          <Form.Check
            className="radioText"
            type="radio"
            label="Public"
            name="AccessRadios"
            id="AccessRadio1"
            value="public"
          />

          <Form.Check
            className="radioText"
            type="radio"
            label="Private"
            name="AccessRadios"
            id="AccessRadio2"
            value="private"
          />
        </Form.Group>
        <Form.Group
          controlId="Organization"
          value={"bloop"}
          onChange={() => console.log("boop")}
        >
          <Form.Label>
            <strong>Organization</strong>
          </Form.Label>
          <Form.Control placeholder="Who does this tap belong to?" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => console.log("boop")}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={() => console.log()}>
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
}

export default SharedFormFields;
