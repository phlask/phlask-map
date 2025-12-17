import { useSearchParams } from 'react-router';
import type { ResourceEntry } from 'types/ResourceEntry';

const SELECTED_PLACE_QUERY_PARAM = 'r';

const useSelectedPlace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPlace = searchParams.get(SELECTED_PLACE_QUERY_PARAM);

  const setSelectedPlace = (resource: ResourceEntry | null) => {
    setSearchParams(prev => {
      if (!resource) {
        prev.delete(SELECTED_PLACE_QUERY_PARAM);
        return prev;
      }

      if (!resource.id) {
        return prev;
      }

      prev.set(SELECTED_PLACE_QUERY_PARAM, resource.id);

      return prev;
    });
  };

  return { selectedPlace, setSelectedPlace };
};

export default useSelectedPlace;
