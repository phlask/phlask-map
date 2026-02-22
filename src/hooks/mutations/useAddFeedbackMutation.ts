import { useMutation } from '@tanstack/react-query';
import { addFeedback } from 'services/db';
import type { FeedbackForm } from 'types/ResourceEntry';

const useAddFeedbackMutation = () => {
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: (feedbackData: FeedbackForm) => addFeedback(feedbackData)
  });

  return { mutate, isPending, isSuccess, error };
};

export default useAddFeedbackMutation;
