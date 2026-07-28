import { useQueryClient } from '@tanstack/react-query';
import BathroomResourceForm from 'components/BathroomResourceForm/BathroomResourceForm';
import FoodResourceForm from 'components/FoodResourceForm/FoodResourceForm';
import ForageResourceForm from 'components/ForageResourceForm/ForageResourceForm';
import ResourceFormSuccess from 'components/ResourceFormSuccess/ResourceFormSuccess';
import WaterResourceForm from 'components/WaterResourceForm/WaterResourceForm';
import { useResourceRevisionContext } from 'contexts/ResourceRevisionContext';
import { useToolbarContext } from 'contexts/ToolbarContext';
import useAddResourceEditMutation from 'hooks/mutations/useAddResourceEditMutation';
import { ResourceType } from 'hooks/useResourceType';
import type { ResourceEntry } from 'types/ResourceEntry';

const EditResourceForm = () => {
  const { resourceRevision, setResourceRevision } =
    useResourceRevisionContext();
  const queryClient = useQueryClient();
  const { setToolbarModal } = useToolbarContext();

  const { isPending, isSuccess, mutate } = useAddResourceEditMutation();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['resources'] });
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

  const onSubmit = ({ id: _id, ...values }: ResourceEntry) => {
    if (!resourceRevision.id) {
      return;
    }
    mutate({ ...values, mapped_resource: resourceRevision.id }, { onSuccess });
  };

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
