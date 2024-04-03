import React, { useState } from 'react';
import { ReactComponent as FacebookIcon } from '../icons/SocialFacebook.svg';
import { ReactComponent as InstagramIcon } from '../icons/SocialInstagram.svg';
import { ReactComponent as TwitterIcon } from '../icons/SocialTwitter.svg';
import { ReactComponent as ContactSubmitImage } from '../images/phlaskContactSubmit.svg';
import styles from './Pages.module.scss';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [interestedResearch, setInterestedResearch] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitted(true);
    // put form submission logic here
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeader}>Contact</h1>
      {!submitted && (
        <div>
          <h2
            className={[styles.pageSubheader, styles.pageContactSection].join(
              ' '
            )}
          >
            Share Feedback
          </h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.pageContactSection}>
              <label className={styles.pageContactLabel}>
                Name <span>*</span>
              </label>
              <br />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.pageContactSection}>
              <label className={styles.pageContactLabel}>
                Email <span>*</span>
              </label>
              <br />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.pageContactSection}>
              <label className={styles.pageContactLabel}>Feedback</label>
              <br />
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                rows="4"
              />
            </div>

            <div
              className={`${styles.pageContactSection} ${styles.pageContactSectionGrid}`}
            >
              <input
                type="checkbox"
                value={interestedResearch}
                onChange={e => setInterestedResearch(e.target.value)}
                className={styles.pageContactCheckbox}
              />

              <label className={`${styles.pageText} ${styles.pageTextLabel}`}>
                I’m interested in helping PHLASK with future research
              </label>
            </div>
            <button
              type="submit"
              onSubmit={handleSubmit}
              className={styles.submitButton}
            >
              <p>Submit Feedback</p>
            </button>
          </form>
          <div className={styles.divContainer}></div>
        </div>
      )}
      {submitted && (
        <div>
          {/* Thank You Message Container */}
          <div className={styles.thankYouMessageContainer}>
            <div className={styles.thankYouMessageSpacer}></div>
            <ContactSubmitImage />
            <h1 className={styles.pageHeader}>Thanks for your feedback!</h1>
            <div className={styles.thankYouMessageSpacer}></div>
          </div>

          {/* Follow PHLASK, Connect, Social Media Icons, and Contact Email */}
          <div className={styles.gridContainer}>
            <h2 className={`${styles.pageSubheader} ${styles.followHeader}`}>
              Follow PHLASK
            </h2>
            <h2 className={`${styles.pageSubheader} ${styles.connectHeader}`}>
              Connect
            </h2>
            <div className={styles.socialLinksContainer}>
              <a href="https://www.facebook.com/PHLASKecosystem/">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/phlaskecosystem/">
                <InstagramIcon />
              </a>
              <a href="https://twitter.com/PHLASKecosystem/">
                <TwitterIcon />
              </a>
            </div>
            <p className={styles.otherInquiries}>
              For all other inquiries, email{' '}
              <a href="mailto:phlaskecosystem@gmail.com">
                phlaskecosystem@gmail.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
