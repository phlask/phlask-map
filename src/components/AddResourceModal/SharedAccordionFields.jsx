import React from "react";
import { Form } from "react-bootstrap";
import styles from "./AddResourceModal.module.scss";

function SharedAccordionFields({
  phlaskStatement,
  onPhlaskStatementChange,
  normsAndRules,
  onNormsAndRulesChange
}) {
  return (
    <>
      <Form.Group
        controlId="phlaskStatement"
        value={phlaskStatement}
        onChange={onPhlaskStatementChange}
      >
        <Form.Label className={styles.modalFormLabel}>
          Phlask Statement
        </Form.Label>
        <Form.Control
          className={styles.modalFormTextInput}
          as="textarea"
          rows={3}
          placeholder="Please use this section to make any statement about your organization and enterprise!"
        />
      </Form.Group>
      <Form.Group
        controlId="normsAndRules"
        value={normsAndRules}
        onChange={onNormsAndRulesChange}
      >
        <Form.Label className={styles.modalFormLabel}>
          Norms and Rules
        </Form.Label>
        <Form.Control
          className={styles.modalFormTextInput}
          as="textarea"
          rows={3}
          placeholder="PHLASKing is intended to be an unobtrusive part of doing business. If there are special norms associated with accessing water, please use this space to describe them."
        />
      </Form.Group>
    </>
  );
}

export default SharedAccordionFields;
