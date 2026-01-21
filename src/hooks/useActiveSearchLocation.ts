import { useSearchParams } from 'react-router';
import filterNullish from 'utils/filterNullish';

export const LOCATION_QUERY_PARAM = 'q';

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

  const getUpdater = (prev: URLSearchParams) => (value: string | null) => {
    if (!value) {
      prev.delete(LOCATION_QUERY_PARAM);
    } else {
      prev.set(LOCATION_QUERY_PARAM, value);
    }
    return prev;
  };

  const onChangeActiveSearchLocation = (
    location: google.maps.LatLngLiteral | null,
    params?: URLSearchParams
  ) => {
    const value = location
      ? filterNullish([location.lat, location.lng]).join(',')
      : null;

    if (params) {
      const update = getUpdater(params);
      return update(value);
    }

    setSearchParams(prev => {
      const update = getUpdater(prev);
      return update(value);
    });
  };

  return { activeSearchLocation, onChangeActiveSearchLocation };
};

export default useActiveSearchLocation;
