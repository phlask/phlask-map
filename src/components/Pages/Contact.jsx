import { forwardRef, useId, useState } from 'react';
import FacebookIcon from 'icons/SocialFacebook';
import InstagramIcon from 'icons/SocialInstagram';
import TwitterIcon from 'icons/SocialTwitter';
import ContactSubmitImage from 'icons/PhlaskContactSubmit';
import { useForm } from 'react-hook-form';
import styles from './Pages.module.scss';

const ContactInput = forwardRef(
  (
    {
      label,
      name,
      onBlur,
      onChange,
      disabled,
      max,
      maxLength,
      min,
      minLength,
      pattern,
      required,
      as: Element = 'input',
      type,
      rows
    },
    ref
  ) => {
    const id = useId();

    return (
      <div className={styles.pageContactSection}>
        <label htmlFor={id} className={styles.pageContactLabel}>
          {label}{' '}
          <span className={styles.asteriskcolor}>{required && '*'}</span>
        </label>
        <br />
        <Element
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          disabled={disabled}
          max={max}
          maxLength={maxLength}
          min={min}
          minLength={minLength}
          pattern={pattern}
          required={required}
          type={type}
          rows={rows}
        />
      </div>
    );
  }
);

ContactInput.displayName = 'ContactInput';

const ContactCheckbox = forwardRef(
  (
    {
      label,
      name,
      onBlur,
      onChange,
      disabled,
      max,
      maxLength,
      min,
      minLength,
      pattern,
      required
    },
    ref
  ) => {
    const id = useId();
    return (
      <div
        className={`${styles.pageContactSection} ${styles.pageContactSectionGrid}`}
      >
        <input
          id={id}
          type="checkbox"
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          ref={ref}
          disabled={disabled}
          max={max}
          maxLength={maxLength}
          min={min}
          minLength={minLength}
          pattern={pattern}
          required={required}
          className={styles.pageContactCheckbox}
        />
        <label
          htmlFor={id}
          className={`${styles.pageText} ${styles.pageTextLabel}`}
        >
          {label}
        </label>
      </div>
    );
  }
);

ContactCheckbox.displayName = 'ContactCheckbox';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = values => {
    // put form submission logic here
    setSubmitted(true);
  };

  const { register, handleSubmit, ...form } = useForm({
    defaultValues: {
      name: '',
      email: '',
      feedback: '',
      isInterestedInResearch: false
    }
  });

  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeader} data-cy="contact-header">
        Contact
      </h1>
      {!submitted && (
        <div>
          <h2
            className={[styles.pageSubheader, styles.pageContactSection].join(
              ' '
            )}
          >
            Share Feedback
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ContactInput
              label="Name"
              {...register('name', { required: true })}
            />
            <ContactInput
              label="Email"
              {...register('email', { required: true })}
            />
            <ContactInput
              className={styles.FeedbackInput}
              label="Feedback"
              as="textarea"
              rows="4"
              {...register('feedback', { required: true })}
            />

            <ContactCheckbox
              label="I’m interested in helping PHLASK with future research"
              {...register('isInterestedInResearch')}
            />

            <button
              type="submit"
              disabled={!form.isValid}
              className={styles.submitButton}
            >
              <span className={styles.buttonText}>Submit Feedback</span>
            </button>
          </form>
        </div>
      )}
      {submitted && (
        <div>
          {/* Thank You Message Container */}
          <div className={styles.thankYouMessageContainer}>
            <div className={styles.thankYouMessageSpacer} />
            <ContactSubmitImage />
            <h1 className={styles.pageHeader}>Thanks for your feedback!</h1>
            <div className={styles.thankYouMessageSpacer} />
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
              <a
                aria-label="Like PHLask on Facebook"
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.facebook.com/PHLASKecosystem/"
                className={styles.socialLink}
              >
                <FacebookIcon />
              </a>
              <a
                aria-label="Follow PHLask on Instagram"
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.instagram.com/phlaskecosystem/"
                className={styles.socialLink}
              >
                <InstagramIcon />
              </a>
              <a
                aria-label="Follow PHLask on Twitter"
                target="_blank"
                rel="noreferrer noopener"
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
      )}
    </div>
  );
};

export default Contact;
