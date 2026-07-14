import AddResourceForm from 'components/AddResourceForm/AddResourceForm';
import ModalOrBottomSheet from 'components/ModalOrBottomSheet/ModalOrBottomSheet';
import { IS_EDIT_RESOURCE_FEATURE_ENABLED } from 'constants/flags';
import { useToolbarContext } from 'contexts/ToolbarContext';

const ContributeModal = () => {
  const { toolbarModal } = useToolbarContext();
  const isContributeModalOpen = toolbarModal === 'contribute';

  // TODO: Implement the logic to determine if the user is editing a resource
  const isEditingResource = false;

  return (
    <ModalOrBottomSheet isOpen={isContributeModalOpen} shouldHideBackdrop>
      {isEditingResource && IS_EDIT_RESOURCE_FEATURE_ENABLED ? null : (
        <AddResourceForm />
      )}
    </ModalOrBottomSheet>
  );
};

export default ContributeModal;
