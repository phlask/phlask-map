import useIsMobile from 'hooks/useIsMobile';
import AddResourceSuccessDesktop from 'components/AddResourceModal/AddResourceSuccessStep/AddResourceSuccess.desktop';
import AddResourceSuccessMobile from 'components/AddResourceModal/AddResourceSuccessStep/AddResourceSuccess.mobile';
import { useToolbarContext } from 'contexts/ToolbarContext';

const AddResourceSuccessStep = () => {
  const { setToolbarModal } = useToolbarContext();
  const isMobile = useIsMobile();

  const onClose = () => setToolbarModal(null);

  if (isMobile) {
    return <AddResourceSuccessMobile onClose={onClose} />;
  }

  return <AddResourceSuccessDesktop onClose={onClose} />;
};

export default AddResourceSuccessStep;
