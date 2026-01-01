import { useMutation } from '@tanstack/react-query';
import { addResource } from 'db';
import type { ResourceEntry } from 'types/ResourceEntry';

const useAddResourceMutation = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (resource: ResourceEntry) => addResource(resource)
  });

  return { mutate, isPending, error };
};

export default useAddResourceMutation;
