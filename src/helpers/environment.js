/**
 * Returns true if the current environment is production. This is determined by the hostname.
 * @returns {boolean}
 */
export const isProdEnv = () => {
  return window.location.hostname === 'phlask.me';
}

/**
 * Returns true if the current environment is the beta environment. This is determined by the hostname.
 * @returns {boolean}
 */
export const isBetaEnv = () => {
  return window.location.hostname === 'beta.phlask.me';
}

/**
 * Returns true if the current environment is the test environment or localhost. This is true for any
 * environment that is not the prod or beta environment.
 * @returns {boolean}
 */
export const isTestEnv = () => {
  return !isProdEnv() && !isBetaEnv();
}
