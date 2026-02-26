import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import feedbackFormSchema, {
  type FeedbackFormValues
} from 'schemas/feedbackFormSchema';
import FormTextField from '../FormTextField/FormTextField';
import { Stack, Button } from '@mui/material';
import FormCheckboxField from '../FormCheckBoxField/FormCheckBoxField';
import useAddFeedbackMutation from 'hooks/mutations/useAddFeedbackMutation';
import { zodResolver } from '@hookform/resolvers/zod';

type FormValues = FeedbackFormValues;

type FeedbackFormProps = {
  onSuccessCallback?: () => void; // Optional: hook into success events
};

const SCHEMA = feedbackFormSchema;

const FeedbackForm = ({ onSuccessCallback }: FeedbackFormProps = {}) => {
  const { mutate: addFeedbackMutate, isPending } = useAddFeedbackMutation();

  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      feedback: '',
      interest: false
    },
    resolver: zodResolver(SCHEMA)
  });

  // 3. Rename internal handler to avoid collisions and keep it clean
  const handleFormSubmit: SubmitHandler<FormValues> = feedbackData => {
    addFeedbackMutate(feedbackData, {
      onSuccess: () => {
        // Optional: Reset form or navigate after success
        methods.reset();
        if (onSuccessCallback) onSuccessCallback();
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <Stack gap={2}>
          <FormTextField<FormValues>
            name="name"
            label="Name"
            placeholder="Enter Your Name"
            required
            sx={{ width: '400px' }}
          />

          <FormTextField<FormValues>
            name="email"
            label="Email"
            placeholder="example@email.com"
            required
            sx={{ width: '400px' }}
          />

          <FormTextField<FormValues>
            name="feedback"
            label="Feedback"
            placeholder="Share your feedback and thoughts"
            multiline
            minRows={3}
            sx={{ width: '800px' }}
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
            sx={{
              backgroundColor: '#10B6FF',
              width: '400px',
              borderRadius: '8px',
              textTransform: 'capitalize'
            }}
            disabled={isPending}
          >
            {isPending ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default FeedbackForm;
