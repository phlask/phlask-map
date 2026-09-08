/**
 * Filter falsy values, but without modifying the array type
 */
function filterNullish<T>(array: T[]): NonNullable<T>[] {
  return array.filter((value): value is NonNullable<T> => Boolean(value));
}

export default filterNullish;
