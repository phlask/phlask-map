import distance from './distance';

/** Find the closest resource to the user's location
 * @param {ResourceEntry[]} data
 * @return {ResourceEntry}
 */
function getClosest(data, userLocation) {
  const distances = data.map((resource, index) => ({
    resource,
    distance: distance(
      userLocation.lat,
      userLocation.lon,
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
