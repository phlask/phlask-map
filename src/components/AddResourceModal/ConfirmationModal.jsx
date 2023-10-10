import React, { useState, useEffect } from 'react';
import phlaskFilterIcon from '../icons/PhlaskFilterIcon';

const Confirmation = ({}) => {
  //initial state should be null/not displayed
  const [showConfirmation, setShowConfirmation] = useState(null);

  //the confirmation should only show if there is a successful submission by the user; error handling?

  function handleShowConfirmation() {
    showConfirmation(true);
    setShowConfirmation(false);
  }

  //onSubmit: should show confirmation: needs the AddResourceModal added first before hooking up
};

return (
  <>
    <Modal centered>
      <Modal.Header closeButton></Modal.Header>

      <Modal.Title id="ConfirmationSuccess">Thanks for Sharing!</Modal.Title>

      <Modal.Body>
        <h3
        className={}>Your submission is under review.</h3>

        <h4>Follow us & Spread the News!</h4>

        {/* row of social media icons; phlask icon as placeholder */}
        <div>
          <span>
            <img src={phlaskFilterIcon('Share', 25, 25)} alt="Share"></img>
          </span>

          <span>
            <img src={phlaskFilterIcon('Facebook', 25, 25)} alt="Facebook"></img>
          </span>

          <span>
            <img src={phlaskFilterIcon('Instagram', 25, 25)} alt="Instagram"></img>
          </span>

          <span>
            <img src={phlaskFilterIcon('Twitter', 25, 25)} alt="Twitter"></img>
          </span>

          <span>
            <img src={phlaskFilterIcon('Github', 25, 25)} alt="Github"></img>
          </span>
        </div>

        {/*Will make this span a link if needed*/}
        <span>#phlask</span>
      </Modal.Body>
    </Modal>
  </>
);

export default ConfirmationModal;
