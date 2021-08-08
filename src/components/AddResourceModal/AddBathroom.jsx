import React from "react";
import styles from "./AddResourceModal.module.scss";
import { Modal, Form, Button } from "react-bootstrap";
// eslint-disable-next-line import/no-unresolved
import SharedFormFields from "./SharedFormFields";

function AddBathroom({
  prev,
  next,
  onDrop,
  name,
  onNameChange,
  address,
  onAddressChange,
  website,
  onWebsiteChange,
  description,
  onDescriptionChange,
  organization,
  onOrganizationChange
}) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Bathroom</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={e => {
            e.preventDefault();
            console.log("boop");
          }}
        >
          <SharedFormFields
            onDrop={onDrop}
            name={name}
            onNameChange={onNameChange}
            address={address}
            onAddressChange={onAddressChange}
            website={website}
            onWebsiteChange={onWebsiteChange}
            description={description}
            onDescriptionChange={onDescriptionChange}
            siteCategory="bathroom"
          />
          <Form.Group value={organization} onChange={onOrganizationChange}>
            <Form.Label className={styles.modalFormLabel}>
              Access Type
            </Form.Label>
            <Form.Control className={styles.modalFormSelect} as="select">
              <option value="">Choose...</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="private shared">Private (Shared)</option>
              <option value="restricted">Restricted</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={prev}>
          Select Another Resource
        </Button>
        <Button variant="primary" type="submit" onClick={() => next()}>
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
}

export default AddBathroom;
