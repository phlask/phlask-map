import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./AddResourceModal.module.scss";
import { Modal, Form, Button, Accordion } from "react-bootstrap";
// eslint-disable-next-line import/no-unresolved
import SharedFormFields from "./SharedFormFields";
// eslint-disable-next-line import/no-unresolved
import SharedAccordionFields from "./SharedAccordionFields";
import * as firebase from "firebase";
import { connectToFirebase } from "./utils";

function AddBathroom({
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
  phlaskStatement,
  onPhlaskStatementChange,
  normsAndRules,
  onNormsAndRulesChange,
  changingTable,            
  onChangeChangingTable, 
  genderNeutral,
  onChangeGenderNeutral,
  familyBathroom,
  onChangeFamilyBathroom,
  singleOccupancy,
  onChangeSingleOccupancy,
  accessible,
  onAccessibleChange,
  idRequired,
  onIdRequiredChange

}) {
  useEffect(() => {
    // create connection to appropriate database
    // based on resource type and hostname of the page
    // (e.g. phlask.me, connect to prod)
    const firebaseConnection = connectToFirebase(
      window.location.hostname,
      "bathroom"
    );
    onDbConnectionChange(firebaseConnection);

    // call back to delete app connection whenever component unmounts
    return () => {
      firebase.app("new").delete();
    };
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Bathroom</Modal.Title>
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
            siteCategory="bathroom"
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
            <Accordion.Toggle className={styles.modalFormLabel} eventKey="0">
              Additional Information{" "}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={styles.filterIcon}
                size="1x"
                color="#525f75"
              />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <div>

                <Form.Check
                  checked={accessible}
                  onChange={onAccessibleChange}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Accessible"
                  value="accessible"
                />

                <Form.Check
                  checked={idRequired}
                  onChange={onIdRequiredChange}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="ID Required"
                  value="idRequired"
                />

                <Form.Check
                  checked={changingTable}
                  onChange={onChangeChangingTable}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Changing table"
                  value="changingTable"
                />

              <Form.Check
                  checked={genderNeutral}
                  onChange={onChangeGenderNeutral}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Gender neutral"
                  value="genderNeutral"
                />

              <Form.Check
                  checked={familyBathroom}
                  onChange={onChangeFamilyBathroom}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Family bathroom"
                  value="familyBathroom"
                />

              <Form.Check
                  checked={singleOccupancy}
                  onChange={onChangeSingleOccupancy}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Single occupancy"
                  value="singleOccupancy"
                />

                <SharedAccordionFields
                  phlaskStatement={phlaskStatement}
                  onPhlaskStatementChange={onPhlaskStatementChange}
                  normsAndRules={normsAndRules}
                  onNormsAndRulesChange={onNormsAndRulesChange}
                />
              </div>
            </Accordion.Collapse>
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

export default AddBathroom;
