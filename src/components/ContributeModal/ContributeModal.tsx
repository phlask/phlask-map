import AddResourceForm from 'components/AddResourceForm/AddResourceForm';
import EditResourceForm from 'components/EditResourceForm/EditResourceForm';
import ModalOrBottomSheet from 'components/ModalOrBottomSheet/ModalOrBottomSheet';
import { IS_EDIT_RESOURCE_FEATURE_ENABLED } from 'constants/flags';
import { useResourceRevisionContext } from 'contexts/ResourceRevisionContext';
import { useToolbarContext } from 'contexts/ToolbarContext';

const ContributeModal = () => {
  const { toolbarModal } = useToolbarContext();
  const { resourceRevision } = useResourceRevisionContext();

  const isContributeModalOpen = toolbarModal === 'contribute';
  const isEditingResource = Boolean(resourceRevision);

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
