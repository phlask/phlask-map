import { useState, useEffect, useMemo } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  Checkbox,
  Stack,
  TextField,
  Button,
  FormControlLabel,
  Alert,
  Collapse
} from '@mui/material';
import { addFeedback } from 'services/db';

import styles from './Pages.module.scss';

const PRIMARY_COLOR = '#10b6ff';
type FormStatus =
  | 'idle'
  | 'success'
  | 'input_error'
  | 'email_error'
  | 'submission_error';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    feedback: '',
    interest: false
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'success') {
      timer = setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === 'interest' ? event.target.checked : event.target.value;
      setForm(prev => ({ ...prev, [field]: value }));
      if (status === 'input_error' || status === 'submission_error') {
        setStatus('idle');
      }
    };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setStatus('input_error');
      return;
    }
    if (!validateEmail(form.email)) {
      setStatus('email_error');
      return;
    }

    try {
      setLoading(true);

      await addFeedback({
        name: form.name,
        email: form.email,
        feedback: form.feedback || null,
        interest: form.interest
      });

      setStatus('success');

      setForm({
        name: '',
        email: '',
        feedback: '',
        interest: false
      });
    } catch (error) {
      console.error(error);
      setStatus('submission_error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', feedback: '', interest: false });
    setStatus('idle');
  };

  const textFieldFocusSX = useMemo(
    () => ({
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: PRIMARY_COLOR
        }
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: PRIMARY_COLOR
      }
    }),
    []
  );

  return (
    <Stack gap={2} sx={{ position: 'relative' }}>
      <h2 className={styles.pageHeader}>Contact Us</h2>

      <Collapse in={status !== 'idle'}>
        {status === 'success' && (
          <Alert severity="success" onClose={() => setStatus('idle')}>
            Thank you! Your feedback has been received!
          </Alert>
        )}
        {status === 'input_error' && (
          <Alert severity="error" onClose={() => setStatus('idle')}>
            Please fill the required (*) fields and try again.
          </Alert>
        )}
        {status === 'email_error' && (
          <Alert severity="error" onClose={() => setStatus('idle')}>
            Please enter a valid email.
          </Alert>
        )}
        {status === 'submission_error' && (
          <Alert severity="error" onClose={() => setStatus('idle')}>
            Something went wrong please try again after sometime.
          </Alert>
        )}
      </Collapse>

      <TextField
        required
        label="Name"
        placeholder="Enter Your Name"
        value={form.name}
        onChange={handleChange('name')}
        sx={textFieldFocusSX}
        autoComplete="name"
      />

      <TextField
        required
        type="email"
        label="Email"
        placeholder="example@email.com"
        value={form.email}
        onChange={handleChange('email')}
        sx={textFieldFocusSX}
        autoComplete="email"
      />

      <TextField
        label="Feedback"
        multiline
        rows={3}
        placeholder="Share your feedback and thoughts"
        value={form.feedback}
        onChange={handleChange('feedback')}
        sx={textFieldFocusSX}
        helperText="Please do not include any sensitive personal information."
        slotProps={{
          formHelperText: {
            sx: {
              color: 'gray',
              fontSize: '0.75rem',
              fontStyle: 'italic',
              marginLeft: '1px'
            }
          }
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={form.interest}
            onChange={handleChange('interest')}
            sx={{
              '&.Mui-checked': { color: PRIMARY_COLOR }
            }}
          />
        }
        label={
          <span className={styles.pageText}>
            I'm interested in helping PHLASK with future research
          </span>
        }
      />

      <Stack direction="row" gap={5}>
        <Button
          variant="text"
          onClick={handleReset}
          sx={{ color: PRIMARY_COLOR }}
        >
          <ReplayIcon sx={{ mr: 0.5 }} />
          clear form
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || status === 'success'}
          sx={{
            fontWeight: 'bold',
            backgroundColor: PRIMARY_COLOR,
            '&:hover': {
              backgroundColor: PRIMARY_COLOR,
              boxShadow: `0 0 10px ${PRIMARY_COLOR}80`
            }
          }}
        >
          {loading
            ? 'Submitting...'
            : status === 'success'
            ? 'Submitted'
            : 'Submit'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Contact;
