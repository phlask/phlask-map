/**
 * Converts degrees given in decimal to DMS (degrees, minutes, and seconds), where seconds are
 * rounded to the tenth place. The returned degrees are not clamped or wrapped in any way.
 */
function decimalDegreesToDMS(degrees: number) {
  let integralDegrees = Math.trunc(degrees);
  const fractionalDegrees = Math.abs(degrees) - Math.abs(integralDegrees);
  const fractionalDegreesInMinutes = fractionalDegrees * 60;
  let minutes = Math.trunc(fractionalDegreesInMinutes);
  const remainingFractionalDegreesInMinutes =
    fractionalDegreesInMinutes - minutes;
  const seconds = remainingFractionalDegreesInMinutes * 60;
  let roundedSeconds = Number(seconds.toFixed(1));
  // Account for rounding edge case
  if (roundedSeconds === 60) {
    minutes += 1;
    roundedSeconds = 0;
  }
  if (minutes === 60) {
    integralDegrees += 1;
    minutes = 0;
  }
  return {
    deg: integralDegrees,
    min: minutes,
    sec: roundedSeconds
  };
}

export default decimalDegreesToDMS;
