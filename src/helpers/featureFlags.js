/**
 * A collection of feature flags that can be used to enable or disable certain features
 * @type {{useResourceSchemaV1: boolean}}
 */
const FeatureFlags = {
  /**
   * If true, uses the new data format from the migration project.
   * Turn this on while developing, and put it back to false before merging.
   */
  useResourceSchemaV1: true,
}

export default FeatureFlags;
