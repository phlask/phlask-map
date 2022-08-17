import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./AddResourceModal.module.scss";
import { Modal, Form, Button, Accordion } from "react-bootstrap";
// eslint-disable-next-line import/no-unresolved
import SharedFormFields from "./SharedFormFields";
// eslint-disable-next-line import/no-unresolved
import SharedAccordionFields from "./SharedAccordionFields";
import { deleteApp } from "firebase/app";
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
      deleteApp(firebaseConnection);
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
            onSubmit(e).then(() => {
              next();
            });
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
                  label="Changing Table"
                  value="changingTable"
                />

              <Form.Check
                  checked={genderNeutral}
                  onChange={onChangeGenderNeutral}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Gender Neutral"
                  value="genderNeutral"
                />

              <Form.Check
                  checked={familyBathroom}
                  onChange={onChangeFamilyBathroom}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Family Bathroom"
                  value="familyBathroom"
                />

              <Form.Check
                  checked={singleOccupancy}
                  onChange={onChangeSingleOccupancy}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Single Occupancy"
                  value="singleOccupancy"
                />

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

export default AddBathroom;
