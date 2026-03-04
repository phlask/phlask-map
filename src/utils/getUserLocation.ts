export type UserLocation = google.maps.LatLngLiteral;
type GetUserLocationReturn = [UserLocation, false] | [null, true];

const getUserLocation = (): Promise<GetUserLocationReturn> =>
  new Promise<GetUserLocationReturn>(resolve =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        const location = { lat, lng };
        const isError = false;

        const value: GetUserLocationReturn = [location, isError];
        resolve(value);
      },
      () => {
        const isError = true;
        const value: GetUserLocationReturn = [null, isError];
        resolve(value);
      }
    )
  );

export default getUserLocation;
