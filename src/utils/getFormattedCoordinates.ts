import decimalDegreesToDMS from 'utils/decimalDegreesToDMS';

/**
 * Returns a formatted string with the latitude and longitude.
 * Example return value: 13°39'49.7"N 45°9'35.6"E
 *
 * Clamps latitude values to be within [-90, 90] and wraps longitude
 * values to be within [-180, 180).
 */
function getFormattedCoordinates(latitude: number, longitude: number) {
  if (!latitude || !longitude) {
    return null;
  }

  let clampedLatitude;
  const wrappedLongitude = longitude % 180;

  if (latitude < -90) clampedLatitude = -90;
  else if (latitude > 90) clampedLatitude = 90;
  else clampedLatitude = latitude;

  const latitudeDMS = decimalDegreesToDMS(clampedLatitude);
  const longitudeDMS = decimalDegreesToDMS(wrappedLongitude);

  const latitudeDir = latitudeDMS.deg < 0 ? 'S' : 'N';
  const longitudeDir = longitudeDMS.deg < 0 ? 'W' : 'E';

  const latitudeFormatted = `${latitudeDMS.deg}\u00B0${latitudeDMS.min}'${latitudeDMS.sec}"${latitudeDir}`;
  const longitudeFormatted = `${longitudeDMS.deg}\u00B0${longitudeDMS.min}'${longitudeDMS.sec}"${longitudeDir}`;

  return `${latitudeFormatted} ${longitudeFormatted}`;
}

export default getFormattedCoordinates;
