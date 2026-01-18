import { useSearchParams } from 'react-router';

const LOCATION_QUERY_PARAM = 'q';

const useActiveSearchLocation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSearchLocationParam = searchParams.get(LOCATION_QUERY_PARAM);
  const [lat, lng] = (activeSearchLocationParam || '')
    .split(',')
    .map(Number)
    .filter((val, index) => index <= 1 && !Number.isNaN(val));

  const isValidLocation = Boolean(lat) && Boolean(lng);
  const activeSearchLocation: google.maps.LatLngLiteral | null = isValidLocation
    ? {
        lat,
        lng
      }
    : null;

  const onChangeActiveSearchLocation = (
    location: google.maps.LatLngLiteral | null
  ) => {
    if (!location) {
      return;
    }

    const value = [location.lat, location.lng].filter(Boolean).join(',');
    setSearchParams(prev => {
      prev.set(LOCATION_QUERY_PARAM, value);

      return prev;
    });
  };

  return { activeSearchLocation, onChangeActiveSearchLocation };
};

export default useActiveSearchLocation;
