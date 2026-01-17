import { useSearchParams } from 'react-router';
import type { ResourceEntry } from 'types/ResourceEntry';

const SELECTED_RESOURCE_QUERY_PARAM = 'r';

const useSelectedResource = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedResource = searchParams.get(SELECTED_RESOURCE_QUERY_PARAM);

  const setSelectedResource = (resource: ResourceEntry | null) => {
    setSearchParams(prev => {
      if (!resource) {
        prev.delete(SELECTED_RESOURCE_QUERY_PARAM);
        return prev;
      }

      if (!resource.id) {
        return prev;
      }

      prev.set(SELECTED_RESOURCE_QUERY_PARAM, resource.id);

      return prev;
    });
  };

  return {
    selectedResource,
    setSelectedResource
  };
};

export default useSelectedResource;
