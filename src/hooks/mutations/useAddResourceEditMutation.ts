import { useMutation } from '@tanstack/react-query';
import { addResourceEdit } from 'services/db';
import type { ResourceEdit } from 'types/ResourceEdit';

const useAddResourceEditMutation = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (resource: ResourceEdit) => addResourceEdit(resource)
  });

  return { mutate, isPending, isSuccess };
};

export default useAddResourceEditMutation;
