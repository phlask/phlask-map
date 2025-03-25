import { forwardRef, useId, useState } from 'react';
import FacebookIcon from 'icons/SocialFacebook';
import InstagramIcon from 'icons/SocialInstagram';
import TwitterIcon from 'icons/SocialTwitter';
import ContactSubmitImage from 'icons/PhlaskContactSubmit';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
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
    <div className={styles.page} style={{ 'overflow-y': 'hidden' }}>
      <Box sx={{ height: '600px' }}>
        <iframe
          title="Contact Us"
          className="airtable-embed"
          src="https://airtable.com/embed/appyNdhZZn3gpovFh/pagDtKnlb6n3mCpgd/form"
          width="100%"
          height="600px"
          style={{ background: 'transparent', border: 'none' }}
        />
      </Box>
    </div>
  );
};

export default Contact;
