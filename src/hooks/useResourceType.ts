import { useSearchParams } from 'react-router';
import { LOCATION_QUERY_PARAM } from './useActiveSearchLocation';

export const ResourceType = {
  WATER: 'WATER',
  FOOD: 'FOOD',
  FORAGE: 'FORAGE',
  BATHROOM: 'BATHROOM'
} as const;

export type ResourceTypeOption = keyof typeof ResourceType;

const RESOURCE_QUERY_PARAM = 'resource-type';

const useResourceType = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const resourceTypeParam =
    searchParams.get(RESOURCE_QUERY_PARAM) || ResourceType.WATER;
  const isValidResourceType = resourceTypeParam in ResourceType;
  const resourceType = (
    isValidResourceType ? resourceTypeParam : ResourceType.WATER
  ) as ResourceTypeOption;

  const setResourceType = (value: ResourceTypeOption) =>
    setSearchParams(prev => {
      const newParams = new URLSearchParams({ [RESOURCE_QUERY_PARAM]: value });
      const searchQuery = prev.get(LOCATION_QUERY_PARAM);
      if (searchQuery) {
        newParams.set(LOCATION_QUERY_PARAM, searchQuery);
      }

      return newParams;
    });

  return {
    resourceType,
    setResourceType
  };
};

export default useResourceType;
