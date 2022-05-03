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

function AddFood({
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
  organization,
  onOrganizationChange,
  accessible,
  onAccessibleChange,
  idRequired,
  onIdRequiredChange,
  childrenOnly,
  onChildrenOnlyChange,
  consumptionType,
  onConsumptionTypeChange,
  foodType,
  onFoodTypeChange,
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
      "food"
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
        <Modal.Title>Add Food</Modal.Title>
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
            siteCategory="food site"
          />
          <Form.Group value={organization} onChange={onOrganizationChange}>
            <Form.Label className={styles.modalFormLabel}>
              Organization Type
            </Form.Label>
            <Form.Control className={styles.modalFormSelect} as="select">
              <option value="">Choose...</option>
              <option value="government">Government</option>
              <option value="business">Business</option>
              <option value="nonprofit">Non-Profit</option>
              <option value="religious">Religious</option>
              <option value="grassroots">Grassroots</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>

          <Accordion data-cy="AdditionalInformation">
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
                  checked={childrenOnly}
                  onChange={onChildrenOnlyChange}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Children and minors only"
                  value="childrenOnly"
                />

                <Form.Group
                  value={consumptionType}
                  onChange={onConsumptionTypeChange}
                >
                  <Form.Label className={styles.modalFormLabel}>
                    Consumption Type
                  </Form.Label>
                  <Form.Control className={styles.modalFormSelect} as="select">
                    {/* TODO: do we want to use whitespace for values? could lead to
                    some odd parsing edge cases -- but if all current data follows
                    this convention then we might have to go through a painful
                    db migration to update old values */}
                    <option value="">Choose...</option>
                    <option value="onsite">Onsite</option>
                    <option value="takeaway">Takeaway</option>
                    <option value="delivery">Delivery</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group value={foodType} onChange={onFoodTypeChange}>
                  <Form.Label className={styles.modalFormLabel}>
                    Food Type
                  </Form.Label>
                  <Form.Control className={styles.modalFormSelect} as="select">
                    <option value="">Choose...</option>
                    <option value="perishable">Perishable</option>
                    <option value="nonperishable">Non-perishable</option>
                    <option value="prepared">Prepared</option>
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

export default AddFood;
