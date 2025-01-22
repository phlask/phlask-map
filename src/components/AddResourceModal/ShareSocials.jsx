import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import useIsMobile from 'hooks/useIsMobile';
import PhillySkyline from 'icons/PhillySkyline';
import styles from './AddResourceModal.module.scss';

const ShareSocials = () => {
  const isMobile = useIsMobile();

  return isMobile ? (
    // MOBILE VIEW
    <div className={styles.modalContent}>
      <Modal.Header className={styles.modalHeader} closeButton />
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
  ):
  // DESKTOP VIEW
  (
    <div>
      <div className={styles.modalContent} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: '419px' }}>
        <PhillySkyline width="258.5" height="225.37" />
        <p className={styles.socialShareMessageHeader}>
          Thank you for your submission!
        </p>
        <p className={styles.socialShareMessage}>
          You should see your site pop up on the map in a few days
        </p>
      </div>
    </div>
  );
}

export default ShareSocials;
