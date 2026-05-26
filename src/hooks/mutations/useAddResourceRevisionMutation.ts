import { useMutation } from '@tanstack/react-query';
import { addResourceRevision } from 'services/db';
import type { ResourceEntry } from 'types/ResourceEntry';

const useAddResourceRevisionMutation = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (resource: ResourceEntry) => addResourceRevision(resource)
  });

  return { mutate, isPending, isSuccess };
};

export default useAddResourceRevisionMutation;
