import { useSearchParams } from 'react-router';
import type { ResourceEntry } from 'types/ResourceEntry';

const SELECTED_RESOURCE_QUERY_PARAM = 'r';

const useSelectedResource = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedResource = searchParams.get(SELECTED_RESOURCE_QUERY_PARAM);

  const getUpdater =
    (prev: URLSearchParams) => (resource: ResourceEntry | null) => {
      if (!resource) {
        prev.delete(SELECTED_RESOURCE_QUERY_PARAM);
        return prev;
      }

      if (!resource.id) {
        return prev;
      }

      prev.set(SELECTED_RESOURCE_QUERY_PARAM, resource.id);

      return prev;
    };

  const setSelectedResource = (
    resource: ResourceEntry | null,
    params?: URLSearchParams
  ) => {
    if (params) {
      const update = getUpdater(params);
      return update(resource);
    }

    setSearchParams(prev => {
      const update = getUpdater(prev);
      return update(resource);
    });
  };

  return {
    selectedResource,
    setSelectedResource
  };
};

export default useSelectedResource;
