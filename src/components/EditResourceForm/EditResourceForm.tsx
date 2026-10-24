import { useQueryClient } from '@tanstack/react-query';
import BathroomResourceForm from 'components/BathroomResourceForm/BathroomResourceForm';
import FoodResourceForm from 'components/FoodResourceForm/FoodResourceForm';
import ForageResourceForm from 'components/ForageResourceForm/ForageResourceForm';
import ResourceFormSuccess from 'components/ResourceFormSuccess/ResourceFormSuccess';
import WaterResourceForm from 'components/WaterResourceForm/WaterResourceForm';
import { useResourceEditContext } from 'contexts/ResourceEditContext';
import { useToolbarContext } from 'contexts/ToolbarContext';
import useAddResourceEditMutation from 'hooks/mutations/useAddResourceEditMutation';
import { ResourceType } from 'hooks/useResourceType';
import type { ResourceEntry } from 'types/ResourceEntry';

const EditResourceForm = () => {
  const { resourceEditCandidate, setResourceEditCandidate } =
    useResourceEditContext();
  const queryClient = useQueryClient();
  const { setToolbarModal } = useToolbarContext();

  const { isPending, isSuccess, mutate } = useAddResourceEditMutation();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['resources'] });
  };

  const onClose = () => {
    setToolbarModal(null);
    setResourceEditCandidate(null);
  };

  if (isSuccess) {
    return <ResourceFormSuccess onClose={onClose} />;
  }

  if (!resourceEditCandidate) {
    return null;
  }

  const onSubmit = ({ id: _id, ...values }: ResourceEntry) => {
    if (!resourceEditCandidate.id) {
      return;
    }
    mutate(
      { ...values, mapped_resource: resourceEditCandidate.id },
      { onSuccess }
    );
  };

  const resourceForms = {
    [ResourceType.WATER]: (
      <WaterResourceForm
        key={resourceEditCandidate.id}
        defaultValues={resourceEditCandidate}
        isSubmitting={isPending}
        onClose={() => setResourceEditCandidate(null)}
        onSubmit={onSubmit}
      />
    ),
    [ResourceType.FOOD]: (
      <FoodResourceForm
        key={resourceEditCandidate.id}
        defaultValues={resourceEditCandidate}
        isSubmitting={isPending}
        onClose={() => setResourceEditCandidate(null)}
        onSubmit={onSubmit}
      />
    ),
    [ResourceType.FORAGE]: (
      <ForageResourceForm
        key={resourceEditCandidate.id}
        defaultValues={resourceEditCandidate}
        isSubmitting={isPending}
        onClose={() => setResourceEditCandidate(null)}
        onSubmit={onSubmit}
      />
    ),
    [ResourceType.BATHROOM]: (
      <BathroomResourceForm
        key={resourceEditCandidate.id}
        defaultValues={resourceEditCandidate}
        isSubmitting={isPending}
        onClose={() => setResourceEditCandidate(null)}
        onSubmit={onSubmit}
      />
    )
  };

  return resourceForms[resourceEditCandidate.resource_type];
};

export default EditResourceForm;
