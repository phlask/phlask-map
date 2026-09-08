import * as z from 'zod';

const feedbackFormSchema = z.object({
  name: z.string().min(2, 'Name is required with a minimum of 2 characters'),
  email: z.email().min(1, 'Email is required'),
  feedback: z
    .string()
    .min(10, 'Feedback is required with a minimum of 10 characters'),
  is_interested_in_contributing: z.boolean()
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;
export default feedbackFormSchema;
