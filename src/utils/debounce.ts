/**
 * Debounce function to limit the rate at which a function can fire.
 */
function debounce<T extends CallableFunction>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default debounce;
