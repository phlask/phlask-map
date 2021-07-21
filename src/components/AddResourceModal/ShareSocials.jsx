import React from "react";
import styles from "./AddResourceModal.module.scss";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

function ShareSocials() {
  return (
    <div className={styles.modalContent}>
      <Modal.Header className={styles.modalHeader} closeButton></Modal.Header>
      <p className={styles.socialShareMessage}>
        You have successfully submitted a resource.
      </p>
      <h1 className={styles.greyHeader}>Thanks for sharing‼</h1>
      <p className={styles.socialShareMessage} style={{ marginTop: 128 }}>
        Follow us on social media:
      </p>
      <div className={styles.socialShareIconWrapper}>
        <a
          className={styles.socialShareIcon}
          href="https://www.facebook.com/pg/PHLASKecosystem/community/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a
          className={styles.socialShareIcon}
          href="https://twitter.com/PHLASKecosystem"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a
          className={styles.socialShareIcon}
          href="https://www.instagram.com/phlaskecosystem/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          className={styles.socialShareIcon}
          href="https://github.com/phlask/phlask-map"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <p className={styles.socialShareMessage}>#phlask</p>
    </div>
  );
}

export default ShareSocials;
