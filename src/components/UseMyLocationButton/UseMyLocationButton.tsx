import { Button } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import useGetUserLocationQuery from 'hooks/queries/useGetUserLocationQuery';

type UseMyLocationButtonProps = {
  onError: (message: string) => void;
  onChange: (address: string) => void;
};

const UseMyLocationButton = ({
  onError,
  onChange
}: UseMyLocationButtonProps) => {
  const { data: userLocation, isSuccess: isUserSharingLocation } =
    useGetUserLocationQuery();

  const onUseMyLocationClick = async () => {
    if (!userLocation) {
      return onError("You're not sharing your location");
    }
    const circle = new google.maps.Circle({
      center: {
        lat: userLocation.latitude,
        lng: userLocation.longitude
      },
      radius: 20
    });

    const { places } = await google.maps.places.Place.searchNearby({
      locationRestriction: circle,
      fields: ['formattedAddress']
    });

    const firstPlace = places.at(0);
    if (!firstPlace?.formattedAddress) {
      return onError(
        "We couldn't find your location, please select an option from the search"
      );
    }

    onChange(firstPlace.formattedAddress || '');
  };

  if (!isUserSharingLocation) {
    return '*Turn on location services to use your location instead';
  }

  return (
    <Button
      disabled={!isUserSharingLocation}
      startIcon={<MyLocationIcon />}
      sx={{ textTransform: 'capitalize' }}
      variant="text"
      type="button"
      onClick={onUseMyLocationClick}
    >
      {isUserSharingLocation
        ? 'Use my location instead'
        : 'Turn on location services to use this feature'}
    </Button>
  );
};

export default UseMyLocationButton;
