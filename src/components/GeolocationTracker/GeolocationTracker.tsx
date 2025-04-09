import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateIsGrantedPermission,
  updateUserLocation
} from 'reducers/user.ts';

const GeolocationTracker = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function queryGeolocationPermissions() {
      const perms = await navigator.permissions.query({ name: 'geolocation' });
      dispatch(updateIsGrantedPermission(perms.state === 'granted'));

      perms.addEventListener('change', () => {
        dispatch(updateIsGrantedPermission(perms.state === 'granted'));
      });
    }
    let interval: NodeJS.Timeout;
    /**
     * This one is a doosy...
     * Basically Firefox doesn't think temporary permissions should trigger the Permissions API onchange event (Which is dumb).
     * This is a workaround that periodically checks for a users location until they respond to the prompt, when it cancels the interval.
     *
     * The main downside here is that we are constantly triggering the access prompt.
     * There is an edge case where a user might click close to when the interval reruns.
     * This will reprompt and make it seem like the prompt didn't close properly.
     *
     * Here is a bugzilla ticket relating to this: https://bugzilla.mozilla.org/show_bug.cgi?id=1719651
     * Hopefully Mozilla changes their mind and will properly handle temporary permissions
     */
    // TODO: Revisit this logic if Mozilla comes to their senses
    if (navigator.userAgent.includes('Firefox')) {
      interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            dispatch(
              updateUserLocation({
                latitude: coords.latitude,
                longitude: coords.longitude
              })
            );
            dispatch(updateIsGrantedPermission(true));
            clearInterval(interval);
          },
          () => {
            dispatch(updateIsGrantedPermission(false));
            clearInterval(interval);
          }
        );
      }, 2000);
      // We also want to run this once at the start of the interval to kick off the prompts
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          dispatch(
            updateUserLocation({
              latitude: coords.latitude,
              longitude: coords.longitude
            })
          );
          dispatch(updateIsGrantedPermission(true));
          clearInterval(interval);
        },
        () => {
          dispatch(updateIsGrantedPermission(false));
          clearInterval(interval);
        }
      );
      // This is the sensible way to handle it...
    } else {
      queryGeolocationPermissions();
    }
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
  return null;
};

export default GeolocationTracker;
