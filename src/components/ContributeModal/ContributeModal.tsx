import AddResourceForm from 'components/AddResourceForm/AddResourceForm';
import EditResourceForm from 'components/EditResourceForm/EditResourceForm';
import ModalOrBottomSheet from 'components/ModalOrBottomSheet/ModalOrBottomSheet';
import { IS_EDIT_RESOURCE_FEATURE_ENABLED } from 'constants/flags';
import { useResourceEditContext } from 'contexts/ResourceEditContext';
import { useToolbarContext } from 'contexts/ToolbarContext';

const ContributeModal = () => {
  const { toolbarModal } = useToolbarContext();
  const { resourceEditCandidate } = useResourceEditContext();

  const isContributeModalOpen = toolbarModal === 'contribute';
  const isEditingResource = Boolean(resourceEditCandidate);

  return (
    <ModalOrBottomSheet isOpen={isContributeModalOpen} shouldHideBackdrop>
      {isEditingResource && IS_EDIT_RESOURCE_FEATURE_ENABLED ? (
        <EditResourceForm />
      ) : (
        <AddResourceForm />
      )}
    </ModalOrBottomSheet>
  );
};

export default ContributeModal;
