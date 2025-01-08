import { useSelector } from 'react-redux';

/**
 * Hook to track the geolocation status in the browser.
 *
 * @returns {boolean} Geolocation enabled flag.
 */
export default function useGeolocationEnabled() {
  const enabled = useSelector(state => state.userData.locationEnabled);
  return enabled;
}
