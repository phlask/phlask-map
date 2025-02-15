import React, { useState } from 'react';
import { ReactComponent as FacebookIcon } from '../icons/SocialFacebook.svg';
import { ReactComponent as InstagramIcon } from '../icons/SocialInstagram.svg';
import { ReactComponent as TwitterIcon } from '../icons/SocialTwitter.svg';
import { ReactComponent as ContactSubmitImage } from '../images/phlaskContactSubmit.svg';
import styles from './Pages.module.scss';

const Contact = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeader} data-cy="contact-header">
        Contact
      </h1>
      <div className={styles.formContainer}>
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/appBEyQwsTDATTOF6/shreoR2ovptpE5cob"
          frameBorder="0"
          width="100%"
          height="533"
          style={{ background: 'transparent', border: '1px solid #ccc' }}
          title="PHLASK Contact Form"
        />
      </div>

      {/* Social Media Section */}
      <div className={styles.gridContainer}>
        <h2 className={`${styles.pageSubheader} ${styles.followHeader}`}>
          Follow PHLASK
        </h2>
        <h2 className={`${styles.pageSubheader} ${styles.connectHeader}`}>
          Connect
        </h2>
        <div className={styles.socialLinksContainer}>
          <a
            href="https://www.facebook.com/PHLASKecosystem/"
            className={styles.socialLink}
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/phlaskecosystem/"
            className={styles.socialLink}
          >
            <InstagramIcon />
          </a>
          <a
            href="https://twitter.com/PHLASKecosystem/"
            className={styles.socialLink}
          >
            <TwitterIcon />
          </a>
        </div>
        <p className={`${styles.pageText} ${styles.otherInquiries}`}>
          For all other inquiries, email{' '}
          <a
            href="mailto:phlaskecosystem@gmail.com"
            className={styles.inquiryLink}
          >
            phlaskecosystem@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;