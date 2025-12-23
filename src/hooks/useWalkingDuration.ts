import { useQuery } from '@tanstack/react-query';
import type { ResourceEntry } from 'types/ResourceEntry';
import useUserLocation from 'hooks/useUserLocation';

const OPEN_ROUTE_SERVICE_API_KEY =
  '5b3ce3597851110001cf6248ac903cdbe0364ca9850aa85cb64d8dfc';

const BASE_URL = 'https://api.openrouteservice.org/v2';
const PATH = '/directions/foot-walking';

export const useWalkingDuration = (selectedResource: ResourceEntry | null) => {
  const { data: userLocation } = useUserLocation();

  const { data, isPending } = useQuery({
    queryKey: ['walking-duration', selectedResource, userLocation],
    queryFn: async () => {
      if (!userLocation) {
        return;
      }

      const startingLocation = [
        userLocation.longitude,
        userLocation.latitude
      ].join(',');
      const endingLocation = [
        selectedResource?.longitude,
        selectedResource?.latitude
      ].join(',');

      const params = new URLSearchParams({
        api_key: OPEN_ROUTE_SERVICE_API_KEY,
        start: startingLocation,
        end: endingLocation
      });
      const url = `${BASE_URL}${PATH}${`?${params.toString()}`}`;
      const response = await fetch(url);
      const data: OpenRouteServiceFootWalkingDirectionResponse =
        await response.json();
      const { duration } = data?.features?.[0]?.properties?.summary ?? {};
      if (!duration) {
        return null;
      }

      return Math.round(duration / 60);
    },
    enabled: Boolean(selectedResource) && Boolean(userLocation)
  });

  return { data, isPending };
};
