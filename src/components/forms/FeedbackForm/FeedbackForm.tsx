import { Stack, Button, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import feedbackFormSchema, {
  type FeedbackFormValues
} from 'schemas/feedbackFormSchema';
import FormTextField from 'components/forms/FormTextField/FormTextField';
import FormCheckboxField from 'components/forms/FormCheckboxField/FormCheckboxField';

type FormValues = FeedbackFormValues;

type FeedbackFormProps = {
  onSubmit: (data: FormValues) => void;
  isPending: boolean;
};

const SCHEMA = feedbackFormSchema;

const FeedbackForm = ({ onSubmit, isPending }: FeedbackFormProps) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      feedback: '',
      interest: false
    },
    resolver: zodResolver(SCHEMA)
  });

  const { handleSubmit } = methods;

  const handleFormSubmit: SubmitHandler<FormValues> = feedbackData => {
    onSubmit(feedbackData);
  };

  return (
    <FormProvider {...methods}>
      <Typography variant="h6">Share Feedback</Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack
          gap={2}
          sx={theme => ({
            mb: 4,
            width: '100%',
            maxWidth: '800px',
            mx: 'auto',
            [theme.breakpoints.up('md')]: {
              mx: 0
            }
          })}
        >
          <FormTextField<FormValues>
            name="name"
            label="Name"
            placeholder="Enter Your Name"
            required
            fullWidth
            sx={theme => ({
              [theme.breakpoints.up('md')]: {
                width: '50%'
              }
            })}
          />

          <FormTextField<FormValues>
            name="email"
            label="Email"
            placeholder="example@email.com"
            required
            fullWidth
            sx={theme => ({
              [theme.breakpoints.up('md')]: {
                width: '50%'
              }
            })}
          />

          <FormTextField<FormValues>
            name="feedback"
            label="Feedback"
            placeholder="Share your feedback and thoughts"
            multiline
            minRows={3}
            required
            fullWidth
            helperText="Please do not include any sensitive personal information."
          />

          <FormCheckboxField<FormValues>
            name="interest"
            label="I'm interested in helping PHLASK with future research"
            labelPlacement="end"
          />

          <Button
            type="submit"
            variant="contained"
            loading={isPending}
            sx={theme => ({
              backgroundColor: '#10B6FF',
              borderRadius: '8px',
              width: '168px',
              alignSelf: 'center',
              [theme.breakpoints.up('md')]: {
                width: '50%',
                alignSelf: 'flex-start'
              }
            })}
          >
            Submit Feedback
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default FeedbackForm;
