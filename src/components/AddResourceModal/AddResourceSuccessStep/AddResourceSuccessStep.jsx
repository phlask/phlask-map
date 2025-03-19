import useIsMobile from 'hooks/useIsMobile';
import AddResourceSuccessDesktop from 'components/AddResourceModal/AddResourceSuccessStep/AddResourceSuccess.desktop';
import AddResourceSuccessMobile from 'components/AddResourceModal/AddResourceSuccessStep/AddResourceSuccess.mobile';

const AddResourceSuccessStep = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <AddResourceSuccessMobile />;
  }

  return <AddResourceSuccessDesktop />;
};

export default AddResourceSuccessStep;
