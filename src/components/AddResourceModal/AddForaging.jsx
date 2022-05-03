import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./AddResourceModal.module.scss";
import { Modal, Form, Accordion, Button } from "react-bootstrap";
// eslint-disable-next-line import/no-unresolved
import SharedFormFields from "./SharedFormFields";
// eslint-disable-next-line import/no-unresolved
import SharedAccordionFields from "./SharedAccordionFields";
import { deleteApp } from "firebase/app";
import { connectToFirebase } from "./utils";

function AddForaging({
  prev,
  next,
  onSubmit,
  onDbConnectionChange,
  onDrop,
  name,
  onNameChange,
  address,
  onAddressChange,
  website,
  onWebsiteChange,
  description,
  onDescriptionChange,
  access,
  onAccessChange,
  accessible,
  onAccessibleChange,
  foragingFoodType,
  onForagingFoodTypeChange,
  phlaskStatement,
  onPhlaskStatementChange,
  normsAndRules,
  onNormsAndRulesChange
}) {
  useEffect(() => {
    // create connection to appropriate database
    // based on resource type and hostname of the page
    // (e.g. phlask.me, connect to prod)
    const firebaseConnection = connectToFirebase(
      window.location.hostname,
      "foraging"
    );
    onDbConnectionChange(firebaseConnection);

    // call back to delete app connection whenever component unmounts
    return () => {
      deleteApp(firebaseConnection);
    };
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Foraging</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(e).then(() => {next()});
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
            siteCategory="foraging location"
          />

          <Form.Group value={access} onChange={onAccessChange}>
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

          <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header className={styles.modalFormLabel}>
              Additional Information
            </Accordion.Header>
            <Accordion.Body>
              <div>
                <Form.Check
                  checked={accessible}
                  onChange={onAccessibleChange}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Accessible"
                  value="accessible"
                />

                <Form.Group
                  value={foragingFoodType}
                  onChange={onForagingFoodTypeChange}
                >
                  <Form.Label className={styles.modalFormLabel}>
                    Food Type
                  </Form.Label>
                  <Form.Control className={styles.modalFormSelect} as="select">
                    <option value="">Choose...</option>
                    <option value="nut">Nut</option>
                    <option value="fruit">Fruit</option>
                    <option value="leaves">Leaves</option>
                    <option value="bark">Bark</option>
                    <option value="flowers">Flowers</option>
                    <option value="mushroom">Mushroom</option>
                    <option value="root">Root</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>

                <SharedAccordionFields
                  phlaskStatement={phlaskStatement}
                  onPhlaskStatementChange={onPhlaskStatementChange}
                  normsAndRules={normsAndRules}
                  onNormsAndRulesChange={onNormsAndRulesChange}
                />
              </div>
            </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Button
            style={{ margin: "16px 0", borderRadius: "6px" }}
            variant="secondary"
            onClick={prev}
          >
            Back
          </Button>
          <Button
            style={{ float: "right", margin: "16px 0", borderRadius: "6px" }}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default AddForaging;
