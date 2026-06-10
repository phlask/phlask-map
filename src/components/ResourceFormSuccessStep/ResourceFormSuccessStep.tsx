import useIsMobile from 'hooks/useIsMobile';
import ResourceFormSuccessDesktop from 'components/ResourceFormSuccessStep/ResourceFormSuccess.desktop';
import ResourceFormSuccessMobile from 'components/ResourceFormSuccessStep/ResourceFormSuccess.mobile';

type ResourceFormSuccessStepProps = {
  onClose: VoidFunction;
};

const ResourceFormSuccessStep = ({ onClose }: ResourceFormSuccessStepProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ResourceFormSuccessMobile onClose={onClose} />;
  }

  return <ResourceFormSuccessDesktop onClose={onClose} />;
};

export default ResourceFormSuccessStep;
