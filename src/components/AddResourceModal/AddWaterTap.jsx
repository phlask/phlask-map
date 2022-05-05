import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Modal, Form, Button, Accordion } from "react-bootstrap";
import styles from "./AddResourceModal.module.scss";
// eslint-disable-next-line import/no-unresolved
import SharedFormFields from "./SharedFormFields";
// eslint-disable-next-line import/no-unresolved
import SharedAccordionFields from "./SharedAccordionFields";
import { deleteApp } from "firebase/app";
import { connectToFirebase } from "./utils";

function AddWaterTap({
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
  idRequired,
  onIdRequiredChange,
  childrenOnly,
  onChildrenOnlyChange,
  waterVesselNeeded,
  onWaterVesselNeededChange,
  filtration,
  onFiltrationChange,
  tapServiceType,
  onTapServiceTypeChange,
  tapType,
  onTapTypeChange,
  phlaskStatement,
  onPhlaskStatementChange,
  normsAndRules,
  onNormsAndRulesChange
}) {
  useEffect(() => {
    // create connection to appropriate database
    // based on resource type and hostname of the page
    // (e.g. phlask.me, connect to prod)
    // and then set dbconnection to the returned connection
    const firebaseConnection = connectToFirebase(
      window.location.hostname,
      "water"
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
        <Modal.Title>Add Water Tap</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
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
            siteCategory="water tap"
          />
          <Form.Group value={access} onChange={onAccessChange} controlId='accessType'>
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

                <Form.Check
                  checked={waterVesselNeeded}
                  onChange={onWaterVesselNeededChange}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Water vessel needed"
                  value="vesselNeeded"
                />

                <Form.Check
                  checked={filtration}
                  onChange={onFiltrationChange}
                  className={styles.modalFormCheck}
                  type="checkbox"
                  label="Filtrated"
                  value="filtrated"
                />
                {/* TODO add sparkling checkbox? */}

                <Form.Group
                  value={tapServiceType}
                  onChange={onTapServiceTypeChange}
                >
                  <Form.Label className={styles.modalFormLabel}>
                    Service Type
                  </Form.Label>
                  <Form.Control className={styles.modalFormSelect} as="select">
                    {/* TODO: do we want to use whitespace for values? could lead to
                    some odd parsing edge cases -- but if all current data follows
                    this convention then we might have to go through a painful
                    db migration to update old values */}
                    <option value="">Choose...</option>
                    <option value="self serve">Self-serve</option>
                    <option value="ask proprietor">Ask proprietor</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group value={tapType} onChange={onTapTypeChange}>
                  <Form.Label className={styles.modalFormLabel}>
                    Tap Type
                  </Form.Label>
                  <Form.Control className={styles.modalFormSelect} as="select">
                    <option value="">Choose...</option>
                    <option value="drinking fountain">Drinking Fountain</option>
                    <option value="bottle filter and fountain">
                      Bottle Filter and Fountain
                    </option>
                    <option value="sink">Sink</option>
                    <option value="soda fountain">Soda Fountain</option>
                    <option value="dedicated water dispenser">
                      Dedicated Water Dispenser
                    </option>
                    <option value="water cooler">Water Cooler</option>
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

export default AddWaterTap;
