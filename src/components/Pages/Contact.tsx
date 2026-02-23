import { Stack, Button, Alert, Collapse } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Page from 'components/Page/Page';
import feedbackFormSchema, {
  type FeedbackFormValues
} from 'schemas/feedbackFormSchema';
import useAddFeedbackMutation from 'hooks/mutations/useAddFeedbackMutation';
import ClearFormIcon from 'icons/ClearFormIcon';
import FormWrapper from 'components/forms/FormWrapper/FormWrapper';
import FormTextField from 'components/forms/FormTextField/FormTextField';
import FormCheckboxField from 'components/forms/FormCheckBoxField/FormCheckBoxField';

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
  const {
    mutate: addFeedbackMutate,
    isPending,
    isSuccess,
    error
  } = useAddFeedbackMutation();

  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      feedback: '',
      interest: false
    },
    resolver: zodResolver(SCHEMA)
  });

  const { reset } = methods;

  const onSubmit = (feedbackData: FormValues) => {
    addFeedbackMutate(feedbackData, {
      onSuccess: () => {
        reset();
      }
    });
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Page title={TITLE} data-cy="contact-us">
      <FormProvider {...methods}>
        <FormWrapper
          onSubmit={onSubmit}
          sx={{ width: { xs: '90%', md: '75%' } }}
        >
          <Stack gap={2}>
            <Collapse in={isSuccess || !!error}>
              {isSuccess && (
                <Alert severity="success">
                  Thank you! Your feedback has been received!
                </Alert>
              )}
              {error && (
                <Alert severity="error">
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

            <FormCheckboxField<FormValues>
              name="interest"
              label="I'm interested in helping PHLASK with future research"
              labelPlacement="end"
              sx={{
                '&.Mui-checked': { color: PRIMARY_COLOR }
              }}
            />

            <Stack direction="row" gap={5} mt={2}>
              <Button
                variant="text"
                onClick={handleClear}
                sx={{ color: PRIMARY_COLOR }}
                startIcon={<ClearFormIcon />}
              >
                clear form
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={isPending || isSuccess}
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: PRIMARY_COLOR,
                  '&:hover': {
                    backgroundColor: PRIMARY_COLOR,
                    boxShadow: `0 0 10px ${PRIMARY_COLOR}80`
                  }
                }}
              >
                {isPending
                  ? 'Submitting...'
                  : isSuccess
                  ? 'Submitted'
                  : 'Submit'}
              </Button>
            </Stack>
          </Stack>
        </FormWrapper>
      </FormProvider>
    </Page>
  );
};

export default Contact;
