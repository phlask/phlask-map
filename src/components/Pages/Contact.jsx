import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import { submitContactForm } from '../../db';
import styles from './Pages.module.scss';

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'bug', label: 'Bug Report' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Box className={styles.page}>
        <h1 className={styles.pageHeader}>Contact Us</h1>
        <Alert severity="success" sx={{ mb: 2 }}>
          Thank you for your message! We&apos;ll get back to you soon.
        </Alert>
        <Button variant="outlined" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </Box>
    );
  }

  return (
    <Box className={styles.page}>
      <h1 className={styles.pageHeader}>Contact Us</h1>
      <p className={styles.pageText}>
        Have a question, feedback, or want to get involved? We&apos;d love to
        hear from you!
      </p>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            name="subject"
            label="Subject"
            select
            value={formData.subject}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          >
            {SUBJECT_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            name="message"
            label="Message"
            value={formData.message}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={4}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#5286E9',
              '&:hover': { backgroundColor: '#4070d0' }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Contact;
