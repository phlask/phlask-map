import React from "react";
import styles from "./AddResourceModal.module.scss";
import { Modal, Form, Accordion, Button } from "react-bootstrap";
// eslint-disable-next-line import/no-unresolved
import SharedFormFields from "./SharedFormFields";
// eslint-disable-next-line import/no-unresolved
import SharedAccordionFields from "./SharedAccordionFields";

function AddFood({
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
  onOrganizationChange,
  phlaskStatement,
  onPhlaskStatementChange,
  normsAndRules,
  onNormsAndRulesChange
}) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Food</Modal.Title>
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
            siteCategory="food site"
          />
          <Form.Group value={organization} onChange={onOrganizationChange}>
            <Form.Label className={styles.modalFormLabel}>
              Organization Type
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
              Additional Information
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div>
                <Form.Group
                  value={"stub"}
                  onChange={() => console.log("Add Foraging Stub")}
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
                  </Form.Control>
                </Form.Group>

                <Form.Group
                  value={"stub"}
                  onChange={() => console.log("Add Foraging Stub")}
                >
                  {/* THIS SHOULD BE A MULTIPICK */}
                  <Form.Label className={styles.modalFormLabel}>
                    Food Type
                  </Form.Label>
                  <Form.Control className={styles.modalFormSelect} as="select">
                    <option value="">Choose...</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group
                  value={"stub"}
                  onChange={() => console.log("Add Foraging Stub")}
                >
                  <Form.Label className={styles.modalFormLabel}>
                    Specific Foods Available
                  </Form.Label>
                  <Form.Control className={styles.modalFormSelect} as="select">
                    <option value="">Choose...</option>
                  </Form.Control>
                </Form.Group>

                <SharedAccordionFields
                  phlaskStatement={phlaskStatement}
                  onPhlaskStatementChange={onPhlaskStatementChange}
                  normsAndRules={normsAndRules}
                  onNormsAndRulesChange={onNormsAndRulesChange}
                />
              </div>
            </Accordion.Collapse>
          </Accordion>
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

export default AddFood;
