import type { UserLocation } from 'reducers/user';
import distance from './distance';
import type { ResourceEntry } from 'types/ResourceEntry';

/** Find the closest resource to the user's location
 * @param {ResourceEntry[]} data
 * @return {ResourceEntry}
 */
function getClosest(data: ResourceEntry[], userLocation: UserLocation) {
  const distances = data.map(resource => ({
    resource,
    distance: distance(
      userLocation.latitude,
      userLocation.longitude,
      resource.latitude,
      resource.longitude
    )
  }));

  // Return the resource with the minimum distance value
  if (!distances.length) return null;
  return distances.reduce(
    (min, p) => (p.distance < min.distance ? p : min),
    distances[0]
  ).resource;
}

export default getClosest;
