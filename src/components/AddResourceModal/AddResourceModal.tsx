import { useState } from 'react';

import ChooseResource from './ChooseResource';
import AddWaterForm from './AddWaterForm/AddWaterForm';
import ModalWrapper from './ModalWrapper';
import { useToolbarContext } from 'contexts/ToolbarContext';
import { ResourceType, type ResourceTypeOption } from 'hooks/useResourceType';
import AddResourceSuccessStep from './AddResourceSuccessStep/AddResourceSuccessStep';
import { useQueryClient } from '@tanstack/react-query';
import AddFoodForm from './AddFoodForm/AddFoodForm';
import AddForageForm from './AddForageForm/AddForageForm';

const AddResourceModal = () => {
  const queryClient = useQueryClient();
  const [resourceForm, setResourceForm] = useState<ResourceTypeOption | null>(
    null
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const onGoBack = () => {
    setResourceForm(null);
  };

  const onComplete = () => {
    queryClient.invalidateQueries({ queryKey: ['resources'] });
    setIsCompleted(true);
    setResourceForm(null);
  };

  const { setToolbarModal } = useToolbarContext();

  const handleClose = () => {
    setToolbarModal(null);
    setResourceForm(null);
    setIsCompleted(false);
  };

  const shouldChooseResource = !isCompleted && !resourceForm;

  return (
    <ModalWrapper onClose={handleClose}>
      {shouldChooseResource && (
        <ChooseResource
          onSelectResource={resource => setResourceForm(resource)}
          onClose={handleClose}
        />
      )}

      {resourceForm === ResourceType.WATER ? (
        <AddWaterForm onGoBack={onGoBack} onComplete={onComplete} />
      ) : null}

      {resourceForm === ResourceType.FOOD ? (
        <AddFoodForm onGoBack={onGoBack} onComplete={onComplete} />
      ) : null}

      {resourceForm === ResourceType.FORAGE ? (
        <AddForageForm onGoBack={onGoBack} onComplete={onComplete} />
      ) : null}

      {isCompleted && <AddResourceSuccessStep onClose={handleClose} />}
    </ModalWrapper>
  );
};

export default AddResourceModal;
