import React from "react";
import { Modal, Form, Button, Accordion } from "react-bootstrap";
// eslint-disable-next-line import/no-unresolved
import SharedFormFields from "./SharedFormFields";
// eslint-disable-next-line import/no-unresolved
import SharedAccordionFields from "./SharedAccordionFields";

function addWaterTap({
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
  tapServiceType,
  onTapServiceTypeChange,
  tapType,
  onTapTypeChange,
  phlaskStatement,
  onPhlaskStatementChange,
  normsAndRules,
  onNormsAndRulesChange
}) {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add Water Tap</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={e => {
            e.preventDefault();
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
            onOrganizationChange={onOrganizationChange}
          />

          <Accordion>
            <Accordion.Toggle eventKey="0">
              Additional Information
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <div>
                {/* TODO create states and change handlers for
                checkboxes */}
                <Form.Check
                  type="checkbox"
                  label="Accessible"
                  value="accessible"
                />

                <Form.Check
                  type="checkbox"
                  label="ID Required"
                  value="idRequired"
                />

                <Form.Check
                  type="checkbox"
                  label="Children and minors only"
                  value="childrenOnly"
                />

                <Form.Check
                  type="checkbox"
                  label="Water vessel needed"
                  value="vesselNeeded"
                />

                <Form.Check
                  type="checkbox"
                  label="Filtrated"
                  value="filtrated"
                />

                <Form.Group
                  value={tapServiceType}
                  onChange={onTapServiceTypeChange}
                >
                  <Form.Label>Service Type</Form.Label>
                  <Form.Control as="select">
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
                  <Form.Label>Tap Type</Form.Label>
                  <Form.Control as="select">
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
            </Accordion.Collapse>
          </Accordion>
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

export default addWaterTap;
