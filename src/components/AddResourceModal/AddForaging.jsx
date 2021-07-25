import React from "react";
import styles from "./AddResourceModal.module.scss";
import { Modal, Form, Accordion, Button } from "react-bootstrap";
// eslint-disable-next-line import/no-unresolved
import SharedFormFields from "./SharedFormFields";
// eslint-disable-next-line import/no-unresolved
import SharedAccordionFields from "./SharedAccordionFields";

function AddForaging({
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
  onChangeOrganization,
  phlaskStatement,
  onPhlaskStatementChange,
  normsAndRules,
  onNormsAndRulesChange
}) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Foraging</Modal.Title>
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
          />
        </Form>

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
                  Food Type
                </Form.Label>
                <Form.Control as="select">
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
                <Form.Label className={styles.modalFormLabel}>
                  Preparation Method
                </Form.Label>
                <Form.Control as="select">
                  <option value="">Choose...</option>
                </Form.Control>
              </Form.Group>

              <Form.Group
                value={"stub"}
                onChange={() => console.log("Add Foraging Stub")}
              >
                <Form.Label className={styles.modalFormLabel}>
                  Plant Type
                </Form.Label>
                <Form.Control as="select">
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

export default AddForaging;
