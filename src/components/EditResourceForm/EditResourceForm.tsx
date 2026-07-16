import { useQueryClient } from '@tanstack/react-query';
import BathroomResourceForm from 'components/BathroomResourceForm/BathroomResourceForm';
import FoodResourceForm from 'components/FoodResourceForm/FoodResourceForm';
import ForageResourceForm from 'components/ForageResourceForm/ForageResourceForm';
import ResourceFormSuccess from 'components/ResourceFormSuccessStep/ResourceFormSuccessStep';
import WaterResourceForm from 'components/WaterResourceForm/WaterResourceForm';
import { useResourceRevisionContext } from 'contexts/ResourceRevisionContext';
import { useToolbarContext } from 'contexts/ToolbarContext';
import useAddResourceRevisionMutation from 'hooks/mutations/useAddResourceRevisionMutation';
import { ResourceType } from 'hooks/useResourceType';
import type { ResourceEntry } from 'types/ResourceEntry';

const EditResourceForm = () => {
  const { resourceRevision, setResourceRevision } =
    useResourceRevisionContext();
  const queryClient = useQueryClient();
  const { setToolbarModal } = useToolbarContext();

  const { isPending, isSuccess, mutate } = useAddResourceRevisionMutation();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['resources'] });
  };

  const onSubmit = (values: ResourceEntry) => {
    mutate(values, { onSuccess });
  };

  const handleClose = () => {
    setToolbarModal(null);
    setResourceRevision(null);
  };

  if (isSuccess) {
    return <ResourceFormSuccess onClose={handleClose} />;
  }

  if (!resourceRevision) {
    return null;
  }

  const resourceForms = {
    [ResourceType.WATER]: (
      <WaterResourceForm
        defaultValues={resourceRevision}
        isSubmitting={isPending}
        onSubmit={onSubmit}
      />
    ),
    [ResourceType.FOOD]: (
      <FoodResourceForm
        defaultValues={resourceRevision}
        isSubmitting={isPending}
        onSubmit={onSubmit}
      />
    ),
    [ResourceType.FORAGE]: (
      <ForageResourceForm
        defaultValues={resourceRevision}
        isSubmitting={isPending}
        onSubmit={onSubmit}
      />
    ),
    [ResourceType.BATHROOM]: (
      <BathroomResourceForm
        defaultValues={resourceRevision}
        isSubmitting={isPending}
        onSubmit={onSubmit}
      />
    )
  };

  return resourceForms[resourceRevision.resource_type];
};

export default EditResourceForm;
