import type { ResourceEntry } from 'types/ResourceEntry';
import filterNullish from 'utils/filterNullish';

/**
 * Get a list of tags to display for a resources
 */
function getTagsFromResource(resource: ResourceEntry): string[] {
  // First, get the tags
  const tags = filterNullish([
    resource.water,
    resource.food,
    resource.forage,
    resource.bathroom
  ]).flatMap(item => item.tags);

  // Then , get resource-specific information
  if (resource.water) {
    return filterNullish(
      tags.concat(resource.water.dispenser_type ?? [])
    ).sort();
  }
  if (resource.food) {
    return filterNullish(
      tags.concat(
        resource.food.food_type ?? [],
        resource.food.distribution_type ?? [],
        resource.food.organization_type ?? []
      )
    ).sort();
  }
  if (resource.forage) {
    return filterNullish(tags.concat(resource.forage.forage_type ?? [])).sort();
  }

  return tags.sort();
}

export default getTagsFromResource;
