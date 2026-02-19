import { useState } from 'react';
import {
  Checkbox,
  Stack,
  Button,
  FormControlLabel,
  Alert,
  Collapse,
  Typography
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { addFeedback } from 'services/db';
import Page from 'components/Page/Page';
import feedbackFormSchema, {
  type FeedbackFormValues
} from 'schemas/feedbackFormSchema';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormTextField from 'components/forms/FormTextField/FormTextField';

type FormValues = FeedbackFormValues;

const TITLE = 'Contact Us';
const PRIMARY_COLOR = '#10b6ff';
const textFieldFocus = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: PRIMARY_COLOR
    }
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: PRIMARY_COLOR
  }
};
const SCHEMA = feedbackFormSchema;

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      feedback: '',
      interest: false
    },
    resolver: zodResolver(SCHEMA)
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (data: FormValues) => {
    setStatus('idle');
    try {
      await addFeedback(data);
      setStatus('success');
      reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handleClear = () => {
    reset();
    setStatus('idle');
  };

  return (
    <Page title={TITLE} data-cy="contact-us">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Stack gap={2}>
            <Collapse in={status !== 'idle'}>
              {status === 'success' && (
                <Alert severity="success" onClose={() => setStatus('idle')}>
                  Thank you! Your feedback has been received!
                </Alert>
              )}
              {status === 'error' && (
                <Alert severity="error" onClose={() => setStatus('idle')}>
                  Something went wrong please try again after sometime.
                </Alert>
              )}
            </Collapse>

            <FormTextField<FormValues>
              name="name"
              label="Name"
              placeholder="Enter Your Name"
              required
              fullWidth
              sx={textFieldFocus}
            />

            <FormTextField<FormValues>
              name="email"
              label="Email"
              placeholder="example@email.com"
              required
              fullWidth
              sx={textFieldFocus}
            />

            <FormTextField<FormValues>
              name="feedback"
              label="Feedback"
              placeholder="Share your feedback and thoughts"
              multiline
              minRows={3}
              fullWidth
              sx={textFieldFocus}
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

            <Controller
              name="interest"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      sx={{
                        '&.Mui-checked': { color: PRIMARY_COLOR }
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 500, lineHeight: '24px' }}
                    >
                      I'm interested in helping PHLASK with future research
                    </Typography>
                  }
                />
              )}
            />

            <Stack direction="row" gap={5} mt={2}>
              <Button
                variant="text"
                onClick={handleClear}
                sx={{ color: PRIMARY_COLOR }}
                startIcon={<ReplayIcon />}
              >
                clear form
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting || status === 'success'}
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: PRIMARY_COLOR,
                  '&:hover': {
                    backgroundColor: PRIMARY_COLOR,
                    boxShadow: `0 0 10px ${PRIMARY_COLOR}80`
                  }
                }}
              >
                {isSubmitting
                  ? 'Submitting...'
                  : status === 'success'
                  ? 'Submitted'
                  : 'Submit'}
              </Button>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </Page>
  );
};

export default Contact;
