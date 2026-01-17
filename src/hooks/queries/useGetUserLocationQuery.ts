import { useQuery } from '@tanstack/react-query';
import { minutesToMilliseconds } from 'date-fns';

export type UserLocation = google.maps.LatLngLiteral;

const queryFn = (): Promise<UserLocation> =>
  new Promise<UserLocation>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        resolve({ lat, lng });
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
