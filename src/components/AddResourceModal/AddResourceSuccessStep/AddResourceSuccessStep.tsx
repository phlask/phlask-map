import useIsMobile from 'hooks/useIsMobile';
import AddResourceSuccessDesktop from 'components/AddResourceModal/AddResourceSuccessStep/AddResourceSuccess.desktop';
import AddResourceSuccessMobile from 'components/AddResourceModal/AddResourceSuccessStep/AddResourceSuccess.mobile';

type AddResourceSuccessStepProps = {
  onClose: VoidFunction;
};

const AddResourceSuccessStep = ({ onClose }: AddResourceSuccessStepProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <AddResourceSuccessMobile onClose={onClose} />;
  }

  return <AddResourceSuccessDesktop onClose={onClose} />;
};

export default AddResourceSuccessStep;
