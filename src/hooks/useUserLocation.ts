import { useQuery } from '@tanstack/react-query';
import { CITY_HALL_COORDINATES } from 'constants/defaults';

type UserLocation = Record<'latitude' | 'longitude', number>;

const initialData: UserLocation = {
  latitude: CITY_HALL_COORDINATES.latitude,
  longitude: CITY_HALL_COORDINATES.longitude
};

const queryFn = (): Promise<UserLocation> =>
  new Promise<UserLocation>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        resolve({ latitude, longitude });
      },
      error => {
        reject(error);
      }
    )
  );

const useUserLocation = () => {
  const {
    data = initialData,
    isPending,
    error
  } = useQuery({
    queryKey: ['user-location'],
    queryFn,
    placeholderData: initialData,
    staleTime: 1000 * 60 * 10
  });

  return { data, isPending, error };
};

export default useUserLocation;
