import * as z from 'zod';

const feedbackFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  feedback: z.string().optional(),
  interest: z.boolean()
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;
export default feedbackFormSchema;
