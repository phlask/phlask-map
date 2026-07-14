import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import ChooseResource from 'components/ChooseResource/ChooseResource';
import { useToolbarContext } from 'contexts/ToolbarContext';
import { ResourceType, type ResourceTypeOption } from 'hooks/useResourceType';
import ResourceFormSuccessStep from 'components/ResourceFormSuccessStep/ResourceFormSuccessStep';
import type { ResourceEntry } from 'types/ResourceEntry';
import useAddResourceMutation from 'hooks/mutations/useAddResourceMutation';
import WaterResourceForm from 'components/WaterResourceForm/WaterResourceForm';
import FoodResourceForm from 'components/FoodResourceForm/FoodResourceForm';
import ForageResourceForm from 'components/ForageResourceForm/ForageResourceForm';
import BathroomResourceForm from 'components/BathroomResourceForm/BathroomResourceForm';

const AddResourceModal = () => {
  const queryClient = useQueryClient();
  const {
    mutate: addResource,
    isPending,
    isSuccess
  } = useAddResourceMutation();
  const { setToolbarModal } = useToolbarContext();
  const [resourceForm, setResourceForm] = useState<ResourceTypeOption | null>(
    null
  );

  const onGoBack = () => {
    setResourceForm(null);
  };

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['resources'] });
    setResourceForm(null);
  };

  const handleClose = () => {
    setToolbarModal(null);
    setResourceForm(null);
  };

  const onSubmit = (values: ResourceEntry) => {
    addResource(values, { onSuccess });
  };

  if (isSuccess) {
    return <ResourceFormSuccessStep onClose={handleClose} />;
  }

  if (!resourceForm) {
    return (
      <ChooseResource
        onSelectResource={resource => setResourceForm(resource)}
        onClose={handleClose}
      />
    );
  }

  const resourceForms = {
    [ResourceType.WATER]: (
      <WaterResourceForm
        onGoBack={onGoBack}
        onSubmit={onSubmit}
        isSubmitting={isPending}
      />
    ),
    [ResourceType.FOOD]: (
      <FoodResourceForm
        onGoBack={onGoBack}
        onSubmit={onSubmit}
        isSubmitting={isPending}
      />
    ),
    [ResourceType.FORAGE]: (
      <ForageResourceForm
        onGoBack={onGoBack}
        onSubmit={onSubmit}
        isSubmitting={isPending}
      />
    ),
    [ResourceType.BATHROOM]: (
      <BathroomResourceForm
        onGoBack={onGoBack}
        onSubmit={onSubmit}
        isSubmitting={isPending}
      />
    )
  };

  return resourceForms[resourceForm];
};

export default AddResourceModal;
