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
import AddBathroomForm from './AddBathroomForm/AddBathroomForm';
import { useEditResourceContext } from 'contexts/EditResourceContext';

const AddResourceModal = () => {
  const queryClient = useQueryClient();
  const [resourceForm, setResourceForm] = useState<ResourceTypeOption | null>(
    null
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const { editingResource, clearEdit } = useEditResourceContext();

  const isEditing = Boolean(editingResource);
  const activeForm = editingResource?.resource_type ?? resourceForm;

  const onGoBack = () => {
    if (isEditing) {
      clearEdit();
    }
    setResourceForm(null);
  };

  const onComplete = () => {
    queryClient.invalidateQueries({ queryKey: ['resources'] });
    setIsCompleted(true);
    setResourceForm(null);
    clearEdit();
  };

  const { setToolbarModal } = useToolbarContext();

  const handleClose = () => {
    setToolbarModal(null);
    setResourceForm(null);
    setIsCompleted(false);
    clearEdit();
  };

  const shouldChooseResource = !isCompleted && !activeForm;

  return (
    <ModalWrapper onClose={handleClose}>
      {shouldChooseResource && (
        <ChooseResource
          onSelectResource={resource => setResourceForm(resource)}
          onClose={handleClose}
        />
      )}

      {activeForm === ResourceType.WATER ? (
        <AddWaterForm
          onGoBack={onGoBack}
          onComplete={onComplete}
          editingResource={editingResource}
        />
      ) : null}

      {activeForm === ResourceType.FOOD ? (
        <AddFoodForm
          onGoBack={onGoBack}
          onComplete={onComplete}
          editingResource={editingResource}
        />
      ) : null}

      {activeForm === ResourceType.FORAGE ? (
        <AddForageForm
          onGoBack={onGoBack}
          onComplete={onComplete}
          editingResource={editingResource}
        />
      ) : null}

      {activeForm === ResourceType.BATHROOM ? (
        <AddBathroomForm
          onGoBack={onGoBack}
          onComplete={onComplete}
          editingResource={editingResource}
        />
      ) : null}

      {isCompleted && <AddResourceSuccessStep onClose={handleClose} />}
    </ModalWrapper>
  );
};

export default AddResourceModal;
