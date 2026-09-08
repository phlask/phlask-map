import { useMutation } from '@tanstack/react-query';
import { addResource } from 'services/db';
import type { ResourceEntry } from 'types/ResourceEntry';

const useAddResourceMutation = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (resource: ResourceEntry) => addResource(resource)
  });

  return { mutate, isPending, isSuccess };
};

export default useAddResourceMutation;
