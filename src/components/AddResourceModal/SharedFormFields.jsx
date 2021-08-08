import React from "react";
import { Form } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import styles from "./AddResourceModal.module.scss";

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
  siteCategory
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
        <Form.Label className={styles.modalFormLabel}>Name</Form.Label>
        <Form.Control
          className={styles.modalFormTextInput}
          text="text"
          placeholder="Organization, store, facility, etc."
        />
      </Form.Group>
      {/* TODO auto complete address based on google maps API */}
      <Form.Group
        controlId="address"
        value={address}
        onChange={onAddressChange}
      >
        <Form.Label className={styles.modalFormLabel}>Address</Form.Label>
        <Form.Control
          className={styles.modalFormTextInput}
          type="text"
          placeholder={`Enter the address of this ${siteCategory}`}
        />
      </Form.Group>
      <Form.Group
        controlId="website"
        value={website}
        onChange={onWebsiteChange}
      >
        <Form.Label className={styles.modalFormLabel}>Website</Form.Label>
        <Form.Control
          className={styles.modalFormTextInput}
          type="text"
          placeholder="https://"
        />
      </Form.Group>
      <Form.Group
        controlId="description"
        value={description}
        onChange={onDescriptionChange}
      >
        <Form.Label className={styles.modalFormLabel}>Description</Form.Label>
        <Form.Control
          className={styles.modalFormTextInput}
          type="textarea"
          rows="2"
          placeholder={`Please describe the ${siteCategory}`}
        />
      </Form.Group>
    </>
  );
}

export default SharedFormFields;
