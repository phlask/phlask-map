import { Button } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import getUserLocation from 'utils/getUserLocation';
import type { ReactNode } from 'react';

type UseMyLocationButtonProps = {
  onError: (message: string) => void;
  onSuccess: (location: google.maps.LatLngLiteral) => void;
  children?: ReactNode;
};

const UseMyLocationButton = ({
  onError,
  onSuccess,
  children = 'Use my location instead'
}: UseMyLocationButtonProps) => {
  const onUseMyLocationClick = async () => {
    const [userLocation, isLocationServicesDisabled] = await getUserLocation();
    if (isLocationServicesDisabled) {
      return onError('Location services must be enabled for this feature');
    }

    onSuccess(userLocation);
  };

  return (
    <Button
      startIcon={<MyLocationIcon />}
      sx={{ textTransform: 'capitalize' }}
      variant="text"
      type="button"
      onClick={onUseMyLocationClick}
    >
      {children}
    </Button>
  );
};

export default UseMyLocationButton;
