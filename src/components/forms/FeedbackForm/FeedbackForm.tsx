import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import feedbackFormSchema, {
  type FeedbackFormValues
} from 'schemas/feedbackFormSchema';
import FormTextField from '../FormTextField/FormTextField';
import { Stack, Button, Typography } from '@mui/material';
import FormCheckboxField from '../FormCheckBoxField/FormCheckBoxField';
import { zodResolver } from '@hookform/resolvers/zod';
import useIsMobile from 'hooks/useIsMobile';

type FormValues = FeedbackFormValues;

type FeedbackFormProps = {
  onSubmit: (data: FormValues) => void;
  isPending: boolean;
};

const SCHEMA = feedbackFormSchema;

const FeedbackForm = ({ onSubmit, isPending }: FeedbackFormProps) => {
  const isMobile = useIsMobile();

  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      feedback: '',
      interest: false
    },
    resolver: zodResolver(SCHEMA)
  });

  const handleFormSubmit: SubmitHandler<FormValues> = feedbackData => {
    onSubmit(feedbackData);
  };

  return (
    <FormProvider {...methods}>
      <Typography variant="h6">Share Feedback</Typography>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Stack
          gap={2}
          sx={{
            mb: 4,
            mx: isMobile ? 'auto' : 0
          }}
        >
          <FormTextField<FormValues>
            name="name"
            label="Name"
            placeholder="Enter Your Name"
            required
            sx={{ width: isMobile ? '95%' : '400px' }}
          />

          <FormTextField<FormValues>
            name="email"
            label="Email"
            placeholder="example@email.com"
            required
            sx={{ width: isMobile ? '95%' : '400px' }}
          />

          <FormTextField<FormValues>
            name="feedback"
            label="Feedback"
            placeholder="Share your feedback and thoughts"
            multiline
            minRows={3}
            required
            helperText="Please do not include any sensitive personal information."
            sx={{ width: isMobile ? '95%' : '800px' }}
          />

          <FormCheckboxField<FormValues>
            name="interest"
            label="I'm interested in helping PHLASK with future research"
            labelPlacement="end"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#10B6FF',
              width: isMobile ? '168px' : '400px',
              borderRadius: '8px',
              alignSelf: isMobile ? 'center' : 'flex-start'
            }}
            loading={isPending}
          >
            Submit Feedback
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default FeedbackForm;
