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
  onChangeOrganization
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
            organization={organization}
            onChangeOrganization={onChangeOrganization}
            siteCategory="bathroom"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={prev}>
          Select Another Resource
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            console.log();
            next();
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
}

export default AddBathroom;
