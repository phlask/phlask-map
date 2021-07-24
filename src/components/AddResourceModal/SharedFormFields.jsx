import React from "react";
import { Form } from "react-bootstrap";
import ImageUploader from "react-images-upload";

function SharedFormFields({
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
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={[".jpg", ".png", ".gif"]}
        maxFileSize={5242880}
        withPreview={true}
      />

      <Form.Group controlId="name" value={name} onChange={onNameChange}>
        <Form.Label>Name</Form.Label>
        <Form.Control
          text="text"
          placeholder="Organization, store, facility, etc."
        />
      </Form.Group>
      <Form.Group
        controlId="address"
        value={address}
        onChange={onAddressChange}
      >
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter the address of this tap" />
      </Form.Group>
      <Form.Group
        controlId="website"
        value={website}
        onChange={onWebsiteChange}
      >
        <Form.Label>Website</Form.Label>
        <Form.Control type="text" placeholder="https://" />
      </Form.Group>
      <Form.Group
        controlId="description"
        value={description}
        onChange={onDescriptionChange}
      >
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="textarea"
          rows="2"
          placeholder="Please describe the water site location"
        />
      </Form.Group>
      <Form.Group
        controlId="Organization"
        value={organization}
        onChange={onChangeOrganization}
      >
        <Form.Label>Organization</Form.Label>
        <Form.Control placeholder="Who does this tap belong to?" />
      </Form.Group>
    </>
  );
}

export default SharedFormFields;
