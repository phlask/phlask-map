import { useQuery } from '@tanstack/react-query';
import type { ResourceEntry } from 'types/ResourceEntry';
import getUserLocation from 'utils/getUserLocation';
import useActiveSearchLocation from 'hooks/useActiveSearchLocation';

const OPEN_ROUTE_SERVICE_API_KEY = import.meta.env
  .VITE_OPEN_ROUTE_SERVICE_API_KEY;

const BASE_URL = 'https://api.openrouteservice.org/v2';
const PATH = '/directions/foot-walking';

type UseWalkingDurationQueryOptions = {
  selectedResource: ResourceEntry;
};

type UserLocationWalkingDurationResponse = {
  locationPermissionState: 'granted';
  minutes: number;
  from: 'your location';
};

type ActiveSearchWalkingDurationResponse = {
  locationPermissionState: Omit<PermissionState, 'granted'>;
  minutes: number;
  from: 'current search';
};

type WalkingDurationNotFoundResponse = {
  locationPermissionState: PermissionState;
  minutes: null;
  from: null;
};

type UseWalkingDurationResponse =
  | UserLocationWalkingDurationResponse
  | ActiveSearchWalkingDurationResponse
  | WalkingDurationNotFoundResponse;

const getUserLocationIfGranted = async (
  state: PermissionState
): Promise<google.maps.LatLngLiteral | null> => {
  if (state !== 'granted') {
    return null;
  }

  const [userLocation, isUserLocationDisabled] = await getUserLocation();
  if (isUserLocationDisabled) {
    return null;
  }

  return userLocation;
};

export const useWalkingDurationQuery = ({
  selectedResource
}: UseWalkingDurationQueryOptions) => {
  const { activeSearchLocation } = useActiveSearchLocation();
  const { latitude, longitude } = selectedResource;

  const queryFn = async (): Promise<UseWalkingDurationResponse> => {
    const locationPermission = await navigator.permissions.query({
      name: 'geolocation'
    });

    const { state } = locationPermission;
    if (state === 'denied' && !activeSearchLocation) {
      return { locationPermissionState: 'denied', from: null, minutes: null };
    }

    const userLocation = await getUserLocationIfGranted(state);
    const location = userLocation || activeSearchLocation;
    if (!location) {
      return { locationPermissionState: state, minutes: null, from: null };
    }

    const startingLocation = [location.lng, location.lat].join(',');
    const endingLocation = [longitude, latitude].join(',');

    const params = new URLSearchParams({
      api_key: OPEN_ROUTE_SERVICE_API_KEY,
      start: startingLocation,
      end: endingLocation
    });
    const url = `${BASE_URL}${PATH}${`?${params.toString()}`}`;
    const response = await fetch(url);
    if (!response.ok) {
      return { locationPermissionState: state, from: null, minutes: null };
    }

    const data: OpenRouteServiceFootWalkingDirectionResponse =
      await response.json();

    const firstFeature = data.features.at(0);
    if (!firstFeature) {
      return { locationPermissionState: state, minutes: null, from: null };
    }

    const { duration } = firstFeature.properties.summary;
    const minutes = Math.round(duration / 60);
    if (state === 'granted') {
      return { locationPermissionState: state, minutes, from: 'your location' };
    }

    return { locationPermissionState: state, minutes, from: 'current search' };
  };

  const { data, refetch, isPending, isRefetching, isError } = useQuery({
    queryKey: ['walking-duration', { selectedResource, longitude, latitude }],
    queryFn
  });

  return {
    data,
    isPending,
    isRefetching,
    refetch,
    isError
  };
};
