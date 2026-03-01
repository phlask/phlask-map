import * as z from 'zod';

const feedbackFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email().min(1, 'Email is required'),
  feedback: z.string().min(1),
  interest: z.boolean()
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;
export default feedbackFormSchema;
