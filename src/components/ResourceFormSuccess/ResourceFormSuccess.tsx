import useIsMobile from 'hooks/useIsMobile';
import ResourceFormSuccessDesktop from 'components/ResourceFormSuccess/ResourceFormSuccess.desktop';
import ResourceFormSuccessMobile from 'components/ResourceFormSuccess/ResourceFormSuccess.mobile';

type ResourceFormSuccessProps = {
  onClose: VoidFunction;
};

const ResourceFormSuccess = ({ onClose }: ResourceFormSuccessProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ResourceFormSuccessMobile onClose={onClose} />;
  }

  return <ResourceFormSuccessDesktop onClose={onClose} />;
};

export default ResourceFormSuccess;
