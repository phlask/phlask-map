import { useQuery } from '@tanstack/react-query';
import { minutesToMilliseconds } from 'date-fns';

export type UserLocation = Record<'latitude' | 'longitude', number>;

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
    data = null,
    isPending,
    error,
    isSuccess
  } = useQuery({
    queryKey: ['user-location'],
    queryFn,
    staleTime: minutesToMilliseconds(10),
    retry: false
  });

  return { data, isPending, error, isSuccess };
};

export default useGetUserLocationQuery;
