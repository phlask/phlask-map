import { useSearchParams } from 'react-router';
import filterNullish from 'utils/filterNullish';

export const LOCATION_QUERY_PARAM = 'q';
const GOOGLE_PLACE_QUERY_PARAM = 'gp-id';

type Value = google.maps.LatLngLiteral & { placeId?: string };

const getLocationFromParam = (value?: string) =>
  (value || '')
    .split(',')
    .map(Number)
    .filter((val, index) => index <= 1 && !Number.isNaN(val));

const useActiveSearchLocation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSearchLocationParam = searchParams.get(LOCATION_QUERY_PARAM);
  const placeId = searchParams.get(GOOGLE_PLACE_QUERY_PARAM);
  const [lat, lng] = getLocationFromParam(activeSearchLocationParam || '');

  const isValidLocation = Boolean(lat) && Boolean(lng);
  const activeSearchLocation: google.maps.LatLngLiteral | null = isValidLocation
    ? { lat, lng }
    : null;

  const getUpdater = (prev: URLSearchParams) => (value: Value | null) => {
    if (!value) {
      prev.delete(LOCATION_QUERY_PARAM);
      prev.delete(GOOGLE_PLACE_QUERY_PARAM);
      return prev;
    }

    const location = filterNullish([value.lat, value.lng]).join(',');
    prev.set(LOCATION_QUERY_PARAM, location);

    const placeId = value.placeId;
    if (!placeId) {
      prev.delete(GOOGLE_PLACE_QUERY_PARAM);
    } else {
      prev.set(GOOGLE_PLACE_QUERY_PARAM, placeId);
    }

    return prev;
  };

  const onChangeActiveSearchLocation = (
    value: Value | null,
    params?: URLSearchParams
  ) => {
    if (params) {
      const update = getUpdater(params);
      return update(value);
    }

    setSearchParams(prev => {
      const update = getUpdater(prev);
      return update(value);
    });
  };

  return { activeSearchLocation, placeId, onChangeActiveSearchLocation };
};

export default useActiveSearchLocation;
