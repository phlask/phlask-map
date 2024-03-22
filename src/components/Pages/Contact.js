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
                Name <span style={{ color: '#DD1E1E' }}>*</span>
              </label>
              <br />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{
                  width: 'min(80%, 400px)',
                  height: '55px',
                  border: '1px solid #73839E',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div className={styles.pageContactSection}>
              <label className={styles.pageContactLabel}>
                Email <span style={{ color: '#DD1E1E' }}>*</span>
              </label>
              <br />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: 'min(80%, 400px)',
                  height: '55px',
                  border: '1px solid #73839E',
                  borderRadius: '3px'
                }}
              />
            </div>
            <div className={styles.pageContactSection}>
              <label className={styles.pageContactLabel}>Feedback</label>
              <br />
              <textarea
                type="text"
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                style={{
                  width: 'min(100%, 800px)',
                  height: '100px',
                  border: '1px solid #73839E',
                  borderRadius: '3px',
                  rows: 4
                }}
              />
            </div>
            <div
              className={styles.pageContactSection}
              style={{
                width: 'fit-content',
                display: 'grid',
                placeItems: 'center',
                gridTemplateColumns: '20px 1fr',
                gap: '8px'
              }}
            >
              <input
                type="checkbox"
                checked={interestedResearch}
                onChange={e => setInterestedResearch(e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              <label
                className={styles.pageText}
                style={{ marginBottom: 0, fontSize: '16px' }}
              >
                I’m interested in helping PHLASK with future research
              </label>
            </div>
            <button
              type="submit"
              style={{
                width: 'min(80%, 400px)',
                marginBottom: '20px',
                padding: '7px 0',
                borderRadius: '8px',
                backgroundColor: '#5286E9'
              }}
            >
              <p
                style={{
                  marginBottom: 0,
                  color: '#ffffff',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '17px',
                  lineHeight: '23px'
                }}
              >
                Submit Feedback
              </p>
            </button>
          </form>
          <div
            style={{
              height:
                'calc((100vh - 76px - 32px - 25px - 25px - 92px - 70px - 502px - 50px))'
            }}
          ></div>
        </div>
      )}
      {submitted && (
        <div>
          {/* Thank You Message Container */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                height:
                  'calc((100vh - 76px - 32px - 25px - 25px - 92px - 70px - 296px - 50px) / 2)'
              }}
            ></div>
            <ContactSubmitImage />
            <h1 className={styles.pageHeader}>Thanks for your feedback!</h1>
            <div
              style={{
                height:
                  'calc((100vh - 76px - 32px - 25px - 25px - 92px - 70px - 296px - 50px) / 2)'
              }}
            ></div>
          </div>

          {/* Follow PHLASK, Connect, Social Media Icons, and Contact Email */}
          <div
            style={{
              width: 'fit-content',
              display: 'grid',
              placeItems: 'center start',
              gridTemplateColumns: '304px 1fr',
              rowGap: '20px',
            }}
          >
            <h2
              className={styles.pageSubheader}
              style={{ width: 'fit-content', margin: 0 }}
            >
              Follow PHLASK
            </h2>
            <h2 className={styles.pageSubheader} style={{ margin: 0 }}>
              Connect
            </h2>
            <div style={{ width: 'fit-content' }}>
              <a
                href="https://www.facebook.com/PHLASKecosystem/"
                style={{ marginRight: '40px' }}
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/phlaskecosystem/"
                style={{ marginRight: '40px' }}
              >
                <InstagramIcon />
              </a>
              <a href="https://twitter.com/PHLASKecosystem/">
                <TwitterIcon />
              </a>
            </div>
            <p className={styles.pageText} style={{ margin: 0 }}>
              For all other inquiries, email{' '}
              <a
                href="mailto:phlaskecosystem@gmail.com"
                className={styles.pageLink}
              >
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
