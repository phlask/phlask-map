import useGetResourcesQuery from './queries/useGetResourcesQuery';
import useActiveFilters from './useActiveFilters';
import useResourceType from './useResourceType';

const useActiveResources = () => {
  const { resourceType } = useResourceType();
  const { activeFilters } = useActiveFilters();

  const { data = [] } = useGetResourcesQuery({
    resourceType,
    filters: activeFilters
  });

  return { data, resourceType, activeFilters };
};

export default useActiveResources;
