import { useQuery } from '@tanstack/react-query';
import { CITY_HALL_COORDINATES } from 'constants/defaults';
import { minutesToMilliseconds } from 'date-fns';

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

const useGetUserLocationQuery = () => {
  const {
    data = initialData,
    isPending,
    error
  } = useQuery({
    queryKey: ['user-location'],
    queryFn,
    placeholderData: initialData,
    staleTime: minutesToMilliseconds(10)
  });

  return { data, isPending, error };
};

export default useGetUserLocationQuery;
