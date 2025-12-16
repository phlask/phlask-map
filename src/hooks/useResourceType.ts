import { useSearchParams } from 'react-router';

export const ResourceType = {
  WATER: 'WATER',
  FOOD: 'FOOD',
  FORAGE: 'FORAGE',
  BATHROOM: 'BATHROOM'
} as const;

type ResourceTypeOption = keyof typeof ResourceType;

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
    setSearchParams(new URLSearchParams({ [RESOURCE_QUERY_PARAM]: value }));

  return {
    resourceType,
    setResourceType
  };
};

export default useResourceType;
