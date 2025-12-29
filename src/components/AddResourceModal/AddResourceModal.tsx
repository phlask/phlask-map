import { useState } from 'react';

import ChooseResource from './ChooseResource';
import AddWaterForm from './AddWaterForm/AddWaterForm';
import ModalWrapper from './ModalWrapper';
import { useToolbarContext } from 'contexts/ToolbarContext';
import { ResourceType, type ResourceTypeOption } from 'hooks/useResourceType';
import AddResourceSuccessStep from './AddResourceSuccessStep/AddResourceSuccessStep';

const AddResourceModal = () => {
  const [resourceForm, setResourceForm] = useState<ResourceTypeOption | null>(
    null
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const onGoBack = () => {
    setResourceForm(null);
  };

  const { setToolbarModal } = useToolbarContext();

  const handleClose = () => {
    setToolbarModal(null);
    setResourceForm(null);
    setIsCompleted(false);
  };

  return (
    <ModalWrapper onClose={handleClose}>
      {!resourceForm && (
        <ChooseResource
          onSelectResource={resource => setResourceForm(resource)}
          onClose={handleClose}
        />
      )}

      {resourceForm === ResourceType.WATER && (
        <AddWaterForm onGoBack={onGoBack} />
      )}

      {isCompleted && <AddResourceSuccessStep />}
    </ModalWrapper>
  );
};

export default AddResourceModal;
